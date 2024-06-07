import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ReadProductDTO } from './dto/read-product.dto';
import { Product } from './interfaces/product.interface';

@Controller('product')
export class ProductController {
    constructor(
        private readonly productService: ProductService,
        @InjectRedis() private readonly redisService: Redis
    ) { }

    @Get('v1/GetAllProducts')
    async getAllProducts() {
        const cacheKey = 'allProducts';

        try {
            const cachedProducts = await this.redisService.get(cacheKey);
            if (cachedProducts)
                return JSON.parse(cachedProducts);

            const products = await this.productService.getAllProducts();
            await this.redisService.set(cacheKey, JSON.stringify(products), 'EX', 3600);

            return products;
        } catch (error) {
            throw error;
        }
    }

    @Get('v1/GetProductByName/:name')
    async getProductByName(@Param('name') productName: string): Promise<Product[]> {
        try {
            return this.productService.getProductsByName(productName);
        } catch (error) {
            throw error;
        }
    }

    @Get('v1/GetProductsByPage')
    async getProductsByPage(@Query('page') page: number, @Query('pageSize') pageSize: number): Promise<ReadProductDTO[]> {
        if (!page || !pageSize)
            throw new Error('Missing query parameters');

        const cacheKey = `productsPage:${page}:${pageSize}`;

        try {
            // Tenta obter dados do cache
            const cachedProducts = await this.redisService.get(cacheKey);
            if (cachedProducts) {
                return JSON.parse(cachedProducts);
            }

            // Se não estiver no cache, busca do banco de dados
            const products = await this.productService.getProductsByPage(page, pageSize);

            // Armazena os dados no cache por 1 hora (3600 segundos)
            await this.redisService.set(cacheKey, JSON.stringify(products), 'EX', 3600);

            return products;
        } catch (error) {
            throw error;
        }
    }

    @Get('v1/GetProductsByPageAndCategory')
    async getProductsByPageAndCategory(@Query('page') page: number, @Query('pageSize') pageSize: number, @Query('category') productCategory: string): Promise<ReadProductDTO[]> {
        if (!page || !pageSize || !productCategory)
            throw new Error('Missing query parameters');

        try {
            return await this.productService.getProductsByPageAndCategory(page, pageSize, productCategory);
        } catch (error) {
            throw error;
        }
    }

    @Get('v1/GetProductsCount')
    async getProductsCount() {
        try {
            return await this.productService.getProductsCount();
        } catch (error) {
            throw error;
        }
    }

    @Post('v1/CreateProduct')
    async createProduct(@Body() createProductDto: CreateProductDto): Promise<CreateProductDto> {
        try {
            const result = await this.productService.createProduct(createProductDto);
            await this.redisService.del('allProducts');
            return result;
        } catch (error) {
            throw error;
        }
    }

    @Delete('v1/DeleteProductsByName/:name')
    async deleteProductsByName(@Param('name') productName: string): Promise<void> {
        try {
            await this.productService.deleteProductsByName(productName);
            await this.redisService.del('allProducts');
        } catch (error) {
            throw error;
        }
    }

    @Delete('v1/DeleteProductById/:id')
    async deleteProdutById(@Param('id') productId: string): Promise<void> {
        try {
            await this.productService.deleteProductById(productId);
            await this.redisService.del('allProducts');
        } catch (error) {
            throw error;
        }
    }
}
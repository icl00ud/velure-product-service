import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';

import { ProductService } from './product.service';

import { CreateProductDto } from './dto/create-product.dto';
import { ReadProductDTO } from './dto/read-product.dto';

import { Product } from './interfaces/product.interface';

@Controller('product')
export class ProductController {
    constructor(
        private readonly productService: ProductService
    ) {}

    @Get('v1/GetAllProducts')
    async getAllProducts() {
        try {
            return this.productService.getAllProducts();
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
        
        try {
            return await this.productService.getProductsByPage(page, pageSize);
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
            return await this.productService.createProduct(createProductDto);
        } catch (error) {
            throw error;           
        }
    }

    @Delete('v1/DeleteProductsByName/:name')
    async deleteProductsByName(@Param('name') productName: string): Promise<void> {
        try {
            await this.productService.deleteProductsByName(productName);
        } catch (error) {
            throw error;           
        }
    }

    @Delete('v1/DeleteProductById/:id')
    async deleteProdutById(@Param('id') productId: string): Promise<void> {
        try {
            return await this.productService.deleteProductById(productId);
        } catch (error) {
            throw error;           
        }
    }
}
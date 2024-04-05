import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiDocGenericPost } from 'src/shared/decorators/api-decorators/api-doc-post-generic.decorator';
import { ApiDocGenericGetAll } from 'src/shared/decorators/api-decorators/api-doc-generic-get-all.decorator';
import { ApiDocGenericGetOne } from 'src/shared/decorators/api-decorators/api-doc-generic-get-one.decorator';
import { Product } from './interfaces/product.interface';
import { ApiDocGenericDelete } from 'src/shared/decorators/api-decorators/api-doc-generic-delete.decorator';
import { ReadProductDTO } from './dto/read-product.dto';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

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
    async getProductsByPage(@Query('page') page: number, @Query('pageSize') pageSize: number): Promise<Product[]> {
        if (!page || !pageSize)
            throw new Error('Missing query parameters');
        
        try {
            return await this.productService.getProductsByPage(page, pageSize);
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
import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiDocGenericPost } from 'src/shared/decorators/api-decorators/api-doc-post-generic.decorator';
import { ApiDocGenericGetAll } from 'src/shared/decorators/api-decorators/api-doc-generic-get-all.decorator';
import { ApiDocGenericGetOne } from 'src/shared/decorators/api-decorators/api-doc-generic-get-one.decorator';
import { Product } from './interfaces/product.interface';
import { ApiDocGenericDelete } from 'src/shared/decorators/api-decorators/api-doc-generic-delete.decorator';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    @ApiDocGenericPost('Product', CreateProductDto)
    async createProduct(@Body() createProductDto: CreateProductDto): Promise<CreateProductDto> {
        try {
            return await this.productService.createProduct(createProductDto);
        } catch (error) {
            throw error;           
        }
    }

    @Get()
    @ApiDocGenericGetAll('Product', CreateProductDto)
    async getAllProducts() {
        try {
            return this.productService.getAllProducts();
        } catch (error) {
            throw error;           
        }
    }

    @Get(':name')
    @ApiDocGenericGetOne('Product', CreateProductDto)
    async getProductByName(@Param('name') productName: string): Promise<Product[]> {
        try {
            return this.productService.getProductsByName(productName);
        } catch (error) {
            throw error;           
        }
    }

    @Delete('/name/:name')
    @ApiDocGenericDelete('Product')
    async deleteProductsByName(@Param('name') productName: string): Promise<void> {
        try {
            await this.productService.deleteProductsByName(productName);
        } catch (error) {
            throw error;           
        }
    }

    @Delete('/id/:id')
    @ApiDocGenericDelete('Product')
    async deleteProdutById(@Param('id') productId: string): Promise<void> {
        try {
            return await this.productService.deleteProductById(productId);
        } catch (error) {
            throw error;           
        }
    }
}
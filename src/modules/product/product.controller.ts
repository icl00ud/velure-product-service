import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ProductRepository } from './product.repository';


@Controller('product')
export class ProductController {
    constructor(private readonly repository: ProductRepository) {}

    @Get()
    async getAllProducts() {
        return this.repository.getAllProducts();
    }
}
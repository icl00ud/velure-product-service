import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    async getAllProducts() {
        try {
            return this.productService.getAllProducts();
        } catch (error) {
            console.log(error);            
        }
    }
}
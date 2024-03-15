import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';

@Module({
    imports: [],
    controllers: [ProductController],
    providers: [ProductService, ProductRepository]
})
export class ProductModule {}
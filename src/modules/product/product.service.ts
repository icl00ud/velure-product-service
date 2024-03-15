import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { Product } from './interfaces/product.interface';

@Injectable()
export class ProductService {
    constructor(private readonly repository: ProductRepository) {}

    async getAllProducts(): Promise<Product[]> {
        return await this.repository.getAllProducts();
    }
}
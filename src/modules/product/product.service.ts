import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
    constructor(private readonly repository: ProductRepository) {}

    getAllProducts(): string {
        return 'teste';
    }
}
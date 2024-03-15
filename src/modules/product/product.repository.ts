import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductRepository {
    constructor() {}

    private products: string[] = [];

    getAllProducts(): string[] {
        this.products = [`Product 1`, `Product 2`, `Product 3`, `Product 4`, `Product 5`];
        return this.products;
    }
}
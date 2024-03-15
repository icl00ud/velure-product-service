import { Inject, Injectable } from '@nestjs/common';
import { Product } from './interfaces/product.interface';
import { PRODUCT_MODEL } from 'src/shared/constants';
import { Model } from 'mongoose';

@Injectable()
export class ProductRepository {
    constructor(
        @Inject(PRODUCT_MODEL)
        private readonly productModel: Model<Product>
    ) {}

    async getAllProducts(): Promise<Product[]> {
        return await this.productModel.find().exec();
    }
}
import { Inject, Injectable } from '@nestjs/common';
import { Product } from './interfaces/product.interface';
import { PRODUCT_MODEL } from 'src/shared/constants';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { ReadProductDTO } from './dto/read-product.dto';

@Injectable()
export class ProductRepository {
    constructor(
        @Inject(PRODUCT_MODEL)
        private readonly productModel: Model<Product>
    ) { }

    async createProduct(createProductDto: CreateProductDto): Promise<Product> {
        return await this.productModel.create(createProductDto);
    };

    async getAllProducts(): Promise<ReadProductDTO[]> {
        return await this.productModel.find().exec();
    }

    async getProductsByName(name: string): Promise<Product[]> {
        return await this.productModel.find({ name }).exec();
    }

    async deleteProductsByName(name: string): Promise<void> {
        await this.productModel.deleteMany({ name });
    }

    async deleteProductById(id: string): Promise<void> {
        await this.productModel.deleteOne({ _id: id });
    }
}
import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';
import { productsProviders } from './product.providers';
import { DatabaseModule } from 'src/providers/databases/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [ProductController],
    providers: [
        ProductService, 
        ProductRepository, 
        ...productsProviders
    ]
})
export class ProductModule {}
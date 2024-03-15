import { Module } from '@nestjs/common';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

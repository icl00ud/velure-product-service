import { Module } from '@nestjs/common';
import { ProductModule } from './modules/product/product.module';
import { RedisModule } from '@nestjs-modules/ioredis';

@Module({
  imports: [
    ProductModule,
    RedisModule.forRootAsync({
      useFactory: () => ({
        type: 'single',
        url: process.env.REDIS_URL || 'redis://localhost:6379',
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
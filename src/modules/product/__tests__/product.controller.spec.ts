import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from '../product.controller';
import { ProductService } from '../product.service';
import { CreateProductDto } from '../dto/create-product.dto';
import Redis from 'ioredis';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;
  let redisClient: Redis;

  beforeEach(async () => {
    redisClient = new Redis();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: {
            getAllProducts: jest.fn().mockResolvedValue([]),
            getProductsByName: jest.fn().mockResolvedValue([]),
            getProductsByPage: jest.fn().mockResolvedValue([]),
            getProductsByPageAndCategory: jest.fn().mockResolvedValue([]),
            getProductsCount: jest.fn().mockResolvedValue(0),
            createProduct: jest.fn().mockResolvedValue({}),
            deleteProductsByName: jest.fn().mockResolvedValue(undefined),
            deleteProductById: jest.fn().mockResolvedValue(undefined),
          },
        },
        {
          provide: 'IORedis',
          useValue: redisClient,
        },
        {
          provide: 'default_IORedisModuleConnectionToken',
          useValue: redisClient,
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  afterAll(async () => {
    await redisClient.quit();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all products', async () => {
    await expect(controller.getAllProducts()).resolves.toEqual([]);
  });

  it('should return products by name', async () => {
    const name = 'test';
    await expect(controller.getProductByName(name)).resolves.toEqual([]);
  });

  it('should return products by page', async () => {
    const page = 1;
    const pageSize = 10;
    await expect(controller.getProductsByPage(page, pageSize)).resolves.toEqual([]);
  });

  it('should return products count', async () => {
    await expect(controller.getProductsCount()).resolves.toEqual(0);
  });

  it('should create a product', async () => {
    const createProductDto: CreateProductDto = {
      name: 'test',
      price: 10,
      disponibility: true,
      quantity_warehouse: 10,
      images: [],
      dimensions: {},
      colors: [],
    };
    await expect(controller.createProduct(createProductDto)).resolves.toEqual({});
  });

  it('should delete a product by name', async () => {
    const name = 'test';
    await expect(controller.deleteProductsByName(name)).resolves.toBeUndefined();
  });

  it('should delete a product by id', async () => {
    const id = 'test';
    await expect(controller.deleteProductById(id)).resolves.toBeUndefined();
  });
});
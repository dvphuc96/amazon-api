import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  ProductRO,
  ProductsRO,
  ProductsWithPaginationRO,
} from 'src/product/product.interface';
import { BaseController } from 'src/base/base.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductInput } from 'src/product/dto/product-input.dto';
@Controller('product')
export class ProductController extends BaseController {
  constructor(
    private readonly productService: ProductService,
    private readonly prismaService: PrismaService,
  ) {
    super();
  }

  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'Return all products.' })
  @Get('/get-all-product')
  async findAll(): Promise<ProductsRO> {
    return this.productService.findAll();
  }

  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ status: 200, description: 'Return all categories.' })
  @Get('/get-all-category')
  getCategory() {
    return this.productService.getCategory();
  }

  @ApiOperation({ summary: 'Get product by id' })
  @ApiResponse({ status: 200, description: 'Return product by id.' })
  @Get('/get-by-id/:id')
  getProductById(@Param('id') id: string): Promise<ProductRO> {
    return this.productService.getProductById(+id);
  }

  @ApiOperation({ summary: 'Get product by category' })
  @ApiResponse({ status: 200, description: 'Return all product by category.' })
  @Get('/get-by-type/:categoryId')
  getProductByCategory(
    @Param('categoryId') categoryId: string,
  ): Promise<ProductsRO> {
    return this.productService.getProductByCategory(+categoryId);
  }

  @ApiOperation({ summary: 'Get all products with pagination' })
  @ApiResponse({
    status: 200,
    description: 'Return all products and pagination',
  })
  @Get('/get-all-product-with-pagination')
  async findAllWithPagination(
    @Query() request: ProductInput,
  ): Promise<ProductsWithPaginationRO> {
    const whereConditions: any = {};

    if (request.categories?.length) {
      const categories = Array.isArray(request.categories)
        ? request.categories.map(Number)
        : [Number(request.categories)];

      whereConditions.category_id = { in: categories };
    }
    if (request.keywords?.length) {
      // Đảm bảo keywords luôn là một mảng
      const keywordsArray = Array.isArray(request.keywords)
        ? request.keywords
        : [request.keywords];

      // Áp dụng điều kiện OR với danh sách từ khóa
      whereConditions.OR = keywordsArray.map((keyword) => ({
        product_name: {
          contains: keyword,
          mode: 'insensitive', // Không phân biệt chữ hoa/thường
        },
      }));
    }

    const limit = +request.pageSize || 10;
    const pageIndex = +request.page || 1;
    const offset = (pageIndex - 1) * limit;
    const order = { ['created_at']: 'desc' };
    const products = await this.findAndCountAllWithPagination(
      this.prismaService.products,
      whereConditions,
      limit,
      offset,
      order,
      'product_id',
    );

    const pagination = {
      page: pageIndex,
      pageCount: Math.ceil(products.count / limit),
      pageSize: limit,
      rowCount: products.count,
    };

    return { products: products.rows, pagination: pagination };
  }
}

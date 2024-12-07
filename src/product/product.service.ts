import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductRO, ProductsRO } from 'src/product/product.interface';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}
  async findAll(): Promise<ProductsRO> {
    const products = await this.prismaService.products.findMany();
    return { products };
  }

  async getCategory() {
    const categories = await this.prismaService.category.findMany();

    return categories;
  }
  async getProductById(id: number): Promise<ProductRO> {
    const product = await this.prismaService.products.findUnique({
      where: {
        product_id: id,
      },
    });
    return { product };
  }
  async getProductByCategory(categoryId: number): Promise<ProductsRO> {
    const products = await this.prismaService.products.findMany({
      where: {
        category_id: categoryId,
      },
    });
    return { products };
  }
}

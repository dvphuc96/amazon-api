import { products } from '@prisma/client';

export interface ProductRO {
  product: products;
}
export interface ProductsRO {
  products: products[];
}
export interface ProductsWithPaginationRO {
  products: ProductsRO;
  pagination: {
    page: number;
    pageCount: number;
    pageSize: number;
    rowCount: number;
  };
}

export interface ProductInput {
  categories: number;
  keyword: string;
  pageSize: number;
  page: number;
}

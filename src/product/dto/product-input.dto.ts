import { ApiPropertyOptional } from '@nestjs/swagger';

export class ProductInput {
  @ApiPropertyOptional({
    type: [Number],
    description: 'List of categories to search.',
  })
  categories?: number[];

  @ApiPropertyOptional({
    type: [String],
    description: 'List of keywords to search.',
  })
  keywords?: string[];

  @ApiPropertyOptional({
    type: Number,
    default: 1,
    description: 'Number of pages',
  })
  page?: number;

  @ApiPropertyOptional({
    type: Number,
    default: 10,
    description: 'Number of products per page (pageSize).',
  })
  pageSize?: number;
}

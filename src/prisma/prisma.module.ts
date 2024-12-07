import { Global, Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
  imports: [],
})
export class PrismaModule {}

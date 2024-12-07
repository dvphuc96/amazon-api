import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRO } from 'src/users/users.interface';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}
  async findOne(email: string): Promise<UserRO | undefined> {
    const user = await this.prismaService.users.findFirst({
      where: {
        email: email,
      },
    });
    return { user };
  }
}

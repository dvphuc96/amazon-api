import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { validate } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { users } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private userService: UsersService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}
  async login(userData: LoginUserDto) {
    // find user by email
    const { email: emailReq, password } = userData;
    const _user = (await this.userService.findOne(emailReq))?.user;
    if (!_user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    // compare password
    const isMatch = await bcrypt.compare(password, _user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const access_token = await this.generateJWT(_user);
    const { email, username } = _user;
    const user = { username, email, access_token };
    return { user };
  }
  async register(userData: CreateUserDto) {
    const { username, email, password } = userData;

    // check email exists
    const user = await this.prismaService.users.findFirst({
      where: {
        email: email,
      },
    });

    if (user) {
      const errors = { email: 'Email already exists' };
      throw new HttpException(
        {
          message: 'Input data validation failed',
          errors,
        },
        HttpStatus.CONFLICT,
      );
    }
    const passwordHash = await bcrypt.hash(password, 10);
    // hash password
    const newUser = {
      username,
      email,
      password: passwordHash,
    };
    const errors = await validate(newUser);
    if (errors.length > 0) {
      const _errors = { username: 'User Input is not valid.' };
      throw new HttpException(
        {
          message: 'Input data validation failed',
          _errors,
        },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return this.prismaService.users.create({
        data: newUser,
      });
    }
  }
  public generateJWT(user: users) {
    const payload = {
      userId: user.user_id,
      username: user.username,
      email: user.email,
    };
    const options = {
      secret: this.config.get('JWT_SECRET_KEY'),
      expiresIn: '1d',
    };
    return this.jwtService.signAsync(payload, options);
  }
  // save user
  // async hashPassword(password: string) {
  //   password = crypto.createHmac('sha256', password).digest('hex');
  //   return password;
  // }
}

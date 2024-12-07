import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiBody({ type: LoginUserDto })
  @Post('/login')
  async login(@Body() userData: LoginUserDto) {
    return this.authService.login(userData);
  }

  @ApiOperation({ summary: 'Register a new User' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Input data validation failed.' })
  @ApiBody({ type: CreateUserDto })
  @Post('/register')
  async register(@Body() userData: CreateUserDto) {
    return this.authService.register(userData);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}

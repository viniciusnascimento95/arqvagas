import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/crate-user.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('register')
  @ApiResponse({ status: 201, description: 'User registered successfully.' })
  async register(@Body() body: CreateUserDto) {
    return this.userService.createUser(body);
  }

  @Post('login')
  @ApiResponse({ status: 200, description: 'User logged in successfully.' })
  async login(@Body() body: LoginDto) {
    const user = await this.authService.validateUser(body.email, body.password);
    return this.authService.login(user);
  }
}

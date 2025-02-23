import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

type UserLoginProps = {
  id: string;
  email: string;
  name: string;
  password: string;
};
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findUserByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: UserLoginProps): Promise<{ name: string ,access_token: string, email: string}> {
    const payload = { username: user.name, sub: user.id, email: user.email };

    return {
      name: user.name,
      email: user.email,
      access_token: this.jwtService.sign(payload),
    };
  }
}

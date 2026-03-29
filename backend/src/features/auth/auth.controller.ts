import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { Public } from '../../core/decorators/public.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/LoginDto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('validate')
  validate(@Headers('authorization') auth?: string) {
    return this.authService.validate(auth);
  }

  @Public()
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('me')
  async getMe(@Headers('authorization') authHeader: string) {
    return this.authService.getMe(authHeader);
  }
}

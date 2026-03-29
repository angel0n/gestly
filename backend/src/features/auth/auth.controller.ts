import { Controller, Headers, Post } from '@nestjs/common';
import { Public } from '../../core/decorators/public.decorator';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('validate')
  validate(@Headers('authorization') auth?: string) {
    return this.authService.validate(auth);
  }
}

import {
  Controller,
  Post,
  UseGuards,
  Get,
  Req,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req) {
    return this.authService.logIn(req.user);
  }

  @Post('logout')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  async logOut(@Req() req) {
    return this.authService.logOut(req);
  }

  @Get('current')
  @UseGuards(JwtAuthGuard)
  async getCurtent(@Req() req) {
    return this.authService.getCurrent(req);
  }
}

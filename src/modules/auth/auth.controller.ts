import { Body, Controller, Post } from '@nestjs/common';
import {  LoginDto, RegisterDto } from 'src/dtos/auth.dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/decorators/current-user';

@Controller('auth')
@ApiTags('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('login')
    Login(@Body() user: LoginDto) {
        return this.authService.login(user);
    }

    @Post('register')
    Register(@Body() user: RegisterDto) {
        return this.authService.register(user);
    }
}
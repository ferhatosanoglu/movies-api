import {
    HttpException,
    HttpStatus,
    Injectable,
    NestMiddleware,
} from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { UserService } from 'src/modules/user/user.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
    constructor(private readonly userService: UserService,
        private configService: ConfigService,
    ) { }

    async use(req: Request, res: Response, next: NextFunction) {
        const bearerHeader = req.headers.authorization;
        const accessToken = bearerHeader && bearerHeader.split(' ')[1];
        let user;
        if (!bearerHeader || !accessToken) {
            next();
            throw new HttpException(
                'Please register or sign in.',
                HttpStatus.FORBIDDEN,
            );
        }
        try {
            const { id }: any = verify(
                accessToken,
                this.configService.get('JWT_SECRET')
            );
            user = await this.userService.find(id);
        } catch (error) {
            throw new HttpException(
                'User not found.',
                HttpStatus.FORBIDDEN,
            );
        }
        if (user) {
            req = user;
        }
        next();
    }
}
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginDto, RegisterDto } from 'src/dtos/auth.dto';
import { UserModel } from 'src/models/user.schema';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {
    constructor(
        @InjectModel('User') private readonly userMongo: Model<UserModel>,
        private configService: ConfigService,
    ) { }
    async login(user: LoginDto) {

        const existUser = await this.userMongo
            .findOne(
                {
                    email: user.email,
                    password: user.password,
                },
                { password: 0 },
            )
            .exec();
        if (existUser) {
            return await {
                existUser,
                accessToken: jwt.sign(
                    { id: existUser._id, email: existUser.email },
                    this.configService.get('JWT_SECRET'),
                ),
            };
        } else {
            throw new HttpException(
                'Kullanıcı emaili veya şifresi hatalı',
                HttpStatus.UNAUTHORIZED,
            );
        }
    }

    async register(user: RegisterDto) {
        const existUser = await this.userMongo
            .findOne(
                {
                    email: user.email,
                },
                { password: 0 },
            )
            .exec();

        if (existUser) {
            throw new HttpException(
                'Bu email adresi zaten kayıtlı',
                HttpStatus.BAD_REQUEST,
            );
        } else {
            const newUser = await this.userMongo.create(user);
            return {
                newUser,
                accessToken: jwt.sign(
                    { id: newUser._id, email: newUser.email },
                    this.configService.get('JWT_SECRET'),
                ),
            };
        }
    }
}
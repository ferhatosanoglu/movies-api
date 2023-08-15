import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterDto } from 'src/dtos/auth.dto';
import { UpdateUserDto } from 'src/dtos/user.dto';
import { UserModel } from 'src/models/user.schema';
import { ResourceService } from 'src/services/resource.service';
@Injectable()
export class UserService extends ResourceService<UserModel, RegisterDto, UpdateUserDto> {
    constructor(
        @InjectModel('User') private userMongo: Model<UserModel>,
    ) {
        super(userMongo);

    }

}
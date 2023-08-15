import { Body, Controller, Delete, Put} from '@nestjs/common';
import { UpdateUserDto } from 'src/dtos/user.dto';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/decorators/current-user';

@Controller('user')
@ApiTags('user')
@ApiBearerAuth()
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Put('')
    async updateUser(@CurrentUser() currentUser, @Body() user: UpdateUserDto) {
        return await this.userService.update(currentUser, user);
    }

    @Delete('')
    async deleteMe(@CurrentUser() currentUser) {
        return await this.userService.delete(currentUser);
    }
}
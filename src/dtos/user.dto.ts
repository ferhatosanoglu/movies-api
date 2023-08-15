import { ApiProperty } from '@nestjs/swagger';
import {  IsEmail, IsOptional, IsString } from 'class-validator';


export class UpdateUserDto {
    @IsEmail()
    @ApiProperty()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    password: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    firstName: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    lastName: string;
}
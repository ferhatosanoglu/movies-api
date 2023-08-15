import { ApiProperty } from '@nestjs/swagger';
import {  IsEmail,  IsString } from 'class-validator';

export class LoginDto {
    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    password: string;
}


export class RegisterDto {
    @ApiProperty({
        example: 'example@example.com',
        description: 'Email of the user',
        type: String,
        required: true,
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'password',
        type: String,
        required: true,

    })
    @IsString()
    password: string;

    @ApiProperty(
        {
            example: 'John',
            description: 'First name of the user',
            type: String,
            required: true,
        },
    )
    @IsString()
    firstName: string;

    @IsString()
    @ApiProperty(
        {
            example: 'Doe',
            description: 'Last name of the user',
            type: String,
            required: true,
        },
    )
    lastName: string;
}

export interface TokenPayloadDto {
    id: string;
    email: string;
    password: string;
}
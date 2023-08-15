import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString, IsUrl } from 'class-validator';


export class UpdateMoviesDto {
    @IsString()
    @ApiProperty()
    name: string;

    @IsString()
    @ApiProperty()
    director: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    imageUrl: string;

}

export class CreateMoviesDto {
    @IsString()
    @ApiProperty()
    name: string;

    @IsString()
    @ApiProperty()
    director: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    imageUrl: string;

    @IsString()
    @IsOptional()
    creatorId: string;
}
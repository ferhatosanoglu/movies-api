import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateMoviesDto, UpdateMoviesDto } from 'src/dtos/movies.dto';
import { MoviesService } from './movies.service';
import { FilterModel } from 'src/models/filter.schema';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/decorators/current-user';

@Controller('movies')
@ApiTags('movies')
@ApiBearerAuth()
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) { }

    @Post('')
    async createMovies(@CurrentUser() CurrentUser, @Body() movies: CreateMoviesDto) {
        movies.creatorId = CurrentUser;
        return await this.moviesService.create(movies);
    }

    @Get('')
    async listMoviess(@CurrentUser() CurrentUser ,@Query() query: FilterModel) {
        
        return await this.moviesService.list(CurrentUser,['name'], query);
    }

    @Get('/:id')
    async getMovies(@Param('id') id: string) {
        return await this.moviesService.find(id);
    }

    @Put('/:id')
    async updateMovies(@Param('id') id: string, @Body() movies: UpdateMoviesDto) {
        return await this.moviesService.update(id, movies);
    }

    @Delete('/:id')
    async deleteMovies(@Param('id') id: string) {
        return await this.moviesService.delete(id);
    }
}
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMoviesDto, UpdateMoviesDto } from 'src/dtos/movies.dto';
import { MoviesModel } from 'src/models/movies.schema';
import { ResourceService } from 'src/services/resource.service';

@Injectable()
export class MoviesService extends ResourceService<MoviesModel, CreateMoviesDto, UpdateMoviesDto> {
    constructor(
        @InjectModel('Movies') private readonly moviesMongo: Model<MoviesModel>,
    ) {
        super(moviesMongo);
    }
}
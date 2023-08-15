import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MoviesSchema } from 'src/models/movies.schema';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Movies', schema: MoviesSchema }])],
    controllers: [MoviesController],
    providers: [MoviesService],
    exports: [MoviesService]
})
export class MoviesModule { }
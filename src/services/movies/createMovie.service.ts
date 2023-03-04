import { iMovie, iMovieReturn } from "../../interfaces/movies.Interfaces";
import { AppDataSource } from "../../data-source";
import { Movie } from "../../entities";
import { Repository } from "typeorm";
import { returnMovieSchema } from "../../schemas/movie.schemas";

export const createMovieService = async ( movieData: iMovie ): Promise<iMovieReturn> => {

    const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie)  

    const movie: Movie = movieRepository.create(movieData)

    await movieRepository.save(movie)

    console.log(movie)
    const newMovie = returnMovieSchema.parse(movie)

    return newMovie
}
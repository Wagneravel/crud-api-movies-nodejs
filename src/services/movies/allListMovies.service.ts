import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Movie } from "../../entities";
import { iMoviesReturn } from "../../interfaces/movies.Interfaces";
import { returnMultipleMoviesSchema } from "../../schemas/movie.schemas";

export const listMovieService = async (): Promise<iMoviesReturn> => {

    const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie)

    const findMovies: Array<Movie> = await movieRepository.find({
        take: 10, //limited
        skip: 0, // offset
        
    })

    const movies = returnMultipleMoviesSchema.parse(findMovies)
    console.log(movies)
    return movies
}
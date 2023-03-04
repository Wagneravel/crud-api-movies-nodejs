import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { Movie } from "../../entities"
import { iMovieReturn } from "../../interfaces/movies.Interfaces"
import { returnMovieSchema } from "../../schemas/movie.schemas"



export const updateMovieService = async (movieData: any, idMovie: number): Promise<iMovieReturn> => {

    const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie)

    const oldMovieData = await movieRepository.findOneBy({
        id: idMovie
    })
    
    const movie = movieRepository.create({
        ...oldMovieData,
        ...movieData
        
    })

    await movieRepository.save(movie)

    const updateMovie = returnMovieSchema.parse(movie)

    return updateMovie

}
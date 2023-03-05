import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { Movie } from "../../entities"
import { AppError } from "../../errors"
import { iMovieReturn, iMovieUpdade } from "../../interfaces/movies.Interfaces"
import { returnMovieSchema } from "../../schemas/movie.schemas"



export const updateMovieService = async (newMovieData: any, idMovie: number): Promise<iMovieReturn> => {

    if(!Object.keys(newMovieData).length){
        console.log(newMovieData)
        throw new AppError('Body cannot be empty, must contain at least description, name, price or duration!')
        
    }
    
    const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie)

    const oldMovieData = await movieRepository.findOneBy({
        id: idMovie
    })
    
    const movie = movieRepository.create({
        ...oldMovieData,
        ...newMovieData
    })

    await movieRepository.save(movie)

    const updateMovie = returnMovieSchema.parse(movie)

    return updateMovie
}

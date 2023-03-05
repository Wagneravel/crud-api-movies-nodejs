import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { Movie } from "../../entities"
import { AppError } from "../../errors"
import { iMovieReturn, iMovieUpdade } from "../../interfaces/movies.Interfaces"
import { returnMovieSchema } from "../../schemas/movie.schemas"



// export const updateMovieService = async (newMovieData: iMovieUpdade, idMovie: number): Promise<iMovieReturn> => {

//     const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie)

//     const oldMovieData = await movieRepository.findOneBy({
//         id: idMovie
//     })
    
//     const movie = movieRepository.create({
//         ...oldMovieData,
//         ...newMovieData
//     })

//     await movieRepository.save(movie)

//     const updateMovie = returnMovieSchema.parse(movie)

//     return updateMovie
// }

export const updateMovieService = async (newMovieData: iMovieUpdade, idMovie: number): Promise<iMovieReturn> => {

    const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie)

    const oldMovieData = await movieRepository.findOneBy({
        id: idMovie
    })

    console.log(oldMovieData)
    console.log(newMovieData)
    
    if (!oldMovieData) {
        throw new AppError('Movie not found', 404)
    }

    // Atualiza apenas as chaves enviadas na solicitação
    if (!newMovieData.name) {
        oldMovieData.name = oldMovieData.name
    }else{oldMovieData.name = newMovieData.name}

    if (!newMovieData.duration) {
        oldMovieData.duration = oldMovieData.duration
    }else{oldMovieData.duration = newMovieData.duration}

    if (!newMovieData.description) {
        oldMovieData.description = oldMovieData.description
    }else{oldMovieData.description = newMovieData.description}

    if (!newMovieData.price) {
        oldMovieData.price = oldMovieData.price
    }else{oldMovieData.price = newMovieData.price}

    
    const novo = await movieRepository.save(oldMovieData)

    console.log(novo)

    const updatedMovie = returnMovieSchema.parse(novo)

    return updatedMovie
}
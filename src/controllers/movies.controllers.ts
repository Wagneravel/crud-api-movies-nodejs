import { Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { iMovie, Pagination } from "../interfaces/movies.Interfaces";
import { listMoviesService } from "../services/movies/allListMovies.service";
import { createMovieService } from "../services/movies/createMovie.service";
import { deleteMovieService } from "../services/movies/deleteMovie.service"
import { updateMovieService } from "../services/movies/updateMovie.service";

export const createMovieController = async (req:Request, res: Response) => {

    const movieData: iMovie = req.body

    const newMovie = await createMovieService(movieData)
    
    return res.status(201).json(newMovie)
  
}

export const listMoviesController = async (req:Request, res: Response) => {
    const movies = await listMoviesService(req.query, req.baseUrl)
    return res.status(200).json(movies)
    
}

// export const listMoviesController = async (req: Request, res: Response) => {
//     const { page = 1, perPage = 5, sort, order } = req.query;
  
//     const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);
  
//     const orderDirection = order === "desc" ? "DESC" : "ASC";
//     const orderBy = sort === "price" || sort === "duration" ? sort : "id";
//     const orderClause = { [orderBy]: orderDirection };
  
//     const totalCount = await movieRepository.count();
//     const skip = (Number(page) - 1) * Number(perPage);
//     const take = Number(perPage) > 5 ? 5 : Number(perPage); 
  
//     const [movies, moviesCount] = await movieRepository.findAndCount({
//       order: orderClause,
//       skip,
//       take,
//     });
  
//     const pagination = {
//       count: totalCount,
//       prevPage: page > 1 ? `${req.baseUrl}?page=${Number(page) - 1}&perPage=${perPage}&sort=${sort}&order=${order}` : null,
//       nextPage: skip + take < totalCount ? `${req.baseUrl}?page=${Number(page) + 1}&perPage=${perPage}&sort=${sort}&order=${order}` : null,
//       data: movies,
//     };
  
//     return res.status(200).json(pagination);
// };
  

export const deleteMovieController = async (req:Request, res: Response) => {

    await deleteMovieService(parseInt(req.params.id)) 
    return res.status(204).send()
}

export const updadeMovieController = async (req:Request, res: Response) => {

    const idMovie = parseInt(req.params.id)
    
    const movieData = req.body

    const updatedMovie = await updateMovieService(movieData, idMovie)

    return res.status(200).json(updatedMovie)
}
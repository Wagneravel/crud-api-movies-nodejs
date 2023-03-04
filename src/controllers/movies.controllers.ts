import { Request, Response } from "express";
import { iMovie } from "../interfaces/movies.Interfaces";
import { listMovieService } from "../services/movies/allListMovies.service";
import { createMovieService } from "../services/movies/createMovie.service";
import { deleteMovieService } from "../services/movies/deleteMovie.service"
import { updateMovieService } from "../services/movies/updateMovie.service";

export const createMovieController = async (req:Request, res: Response) => {

    const movieData: iMovie = req.body

    const newMovie = await createMovieService(movieData)
    
    return res.status(201).json(newMovie)
  
}

export const listMoviesController = async (req:Request, res: Response) => {

    const movies = await listMovieService()

    return res.status(200).json(movies)
  
}

export const deleteMovieController = async (req:Request, res: Response) => {

    await deleteMovieService(parseInt(req.params.id)) 

    return res.status(204).send()
  
}

export const updadeMovieController = async (req:Request, res: Response) => {

    const movieData = req.body

    const idMovie = parseInt(req.params.id)

    const updatedMovie = await updateMovieService(movieData, idMovie)

    return res.status(200).json(updatedMovie)
  
}

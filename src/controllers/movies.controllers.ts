import { Request, Response } from "express";
import { createMovieService } from "../services/movies/createMovie.service";
import { allListMoviesService } from "../services/movies/allListMovies.service";
import { updateMovieService } from "../services/movies/updateMovie.service";
import { deleteMovieService } from "../services/movies/deleteMovie.service";


export async function createMovieControllers(request:Request, response: Response): Promise<Response>{

    const movieDate = request.body
    const newMovie = await createMovieService(movieDate)

    return response.status(201).json(newMovie)
}

export async function allListMoviesControllers(request:Request, response: Response): Promise<Response>{

    const isMovieID: number = request.body.id
    const allList = await allListMoviesService(isMovieID)

    return response.status(200).json(allList)
}


export async function updateMovieControllers(request:Request, response: Response): Promise<Response>{



    const user = await updateMovieService(request.body,request.body.id)

    return response.status(200).json(user)
}

export async function deleteMovieControllers(request:Request, response: Response): Promise<Response>{

    const movieID = await deleteMovieService(request.body.id)
    
    return response.status(204).json(movieID)
}



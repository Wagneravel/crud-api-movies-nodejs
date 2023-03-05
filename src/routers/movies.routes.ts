import { Router } from "express";
import { createMovieController, deleteMovieController, listMoviesController, updadeMovieController } from "../controllers/movies.controllers";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { checkIfIdMovieExistsMiddleware } from "../middlewares/verifyIdMovieExists.middleware";
import { checkIfNameMovieExistsMiddleware } from "../middlewares/verifyNameMovie.middleware";
import { movieSchema, updateMovieSchema } from "../schemas/movie.schemas";


const moviesRoutes:Router = Router() 

moviesRoutes.post('', ensureDataIsValidMiddleware(movieSchema), checkIfNameMovieExistsMiddleware, createMovieController)
moviesRoutes.get('', listMoviesController )
moviesRoutes.patch('/:id', ensureDataIsValidMiddleware(updateMovieSchema), checkIfNameMovieExistsMiddleware, checkIfIdMovieExistsMiddleware,  updadeMovieController )
moviesRoutes.delete('/:id',checkIfIdMovieExistsMiddleware, deleteMovieController )

export default moviesRoutes





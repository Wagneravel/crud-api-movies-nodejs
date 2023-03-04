import { Router } from "express";
import { createMovieController, deleteMovieController, listMoviesController, updadeMovieController } from "../controllers/movies.controllers";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { checkIfIdMovieExistsMiddleware } from "../middlewares/verifyIdMovieExists.middleware";
import { movieSchema } from "../schemas/movie.schemas";


const moviesRoutes:Router = Router() 

moviesRoutes.post('', ensureDataIsValidMiddleware(movieSchema), createMovieController)
moviesRoutes.get('', listMoviesController )
moviesRoutes.patch('/:id', ensureDataIsValidMiddleware(movieSchema), checkIfIdMovieExistsMiddleware, updadeMovieController )
moviesRoutes.delete('/:id',checkIfIdMovieExistsMiddleware, deleteMovieController )

export default moviesRoutes





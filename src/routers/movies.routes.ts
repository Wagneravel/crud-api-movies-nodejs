import { Router } from "express";
import { createMovieControllers, allListMoviesControllers, updateMovieControllers, deleteMovieControllers } from "../controllers/movies.controllers";
import { verifyMovieIdExists } from "../middlewares/verifyIdMovieExists.middleware";
import { verifyMovieNameExists } from "../middlewares/verifyNameMovie.middleware";



const moviesRoutes:Router = Router() 

moviesRoutes.post("",verifyMovieNameExists, createMovieControllers)
moviesRoutes.get("", allListMoviesControllers)
moviesRoutes.patch("/:id",verifyMovieIdExists, verifyMovieNameExists, updateMovieControllers)
moviesRoutes.delete("/:id",verifyMovieIdExists, deleteMovieControllers)

export default moviesRoutes





import { movieSchema, returnMovieSchema, returnMultipleMoviesSchema, updateMovieSchema } from "../schemas/movie.schemas";
import { z } from "zod";

export type iMovie = z.infer<typeof movieSchema>
export type iMovieReturn = z.infer<typeof returnMovieSchema>
export type iMoviesReturn = z.infer<typeof returnMultipleMoviesSchema>
export type iMovieUpdade = z.infer<typeof updateMovieSchema>
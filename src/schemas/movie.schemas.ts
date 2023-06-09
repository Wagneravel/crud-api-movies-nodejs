import { z } from "zod"
import { hashSync } from "bcryptjs"
import { Movie } from "../entities/movie.entity";

export const movieSchema = z.object({
    name: z.string().max(50),
    description:z.string().nullish(),
    duration: z.number().int().gt(0),
    price: z.number().int(),
})

export const updateMovieSchema = movieSchema.partial()

export const returnMovieSchema = movieSchema.extend({
    id: z.number(),
})

export const returnMultipleMoviesSchema = returnMovieSchema.array()


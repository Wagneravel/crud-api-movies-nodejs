import { z } from "zod"
import { hashSync } from "bcryptjs"
import { Movie } from "../entities/movie.entity";

export const movieSchema = z.object({
    name: z.string().max(50),
    description:z.string().optional(),
    duration: z.number().int(),
    price: z.number().int(),
})

export const updateMovieSchema = movieSchema.partial()

export const returnMovieSchema = movieSchema.extend({
    id: z.number(),
})

export const returnMultipleMoviesSchema = returnMovieSchema.array()


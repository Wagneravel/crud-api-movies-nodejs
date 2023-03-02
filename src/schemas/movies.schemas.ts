import { z } from "zod"
import { hashSync } from "bcryptjs"

export const movieSchema = z.object({
    name: z.string().max(50),
    description:z.string(),
    duration: z.number(),
    price: z.number()
      
})
export const moviesResponseSchema = movieSchema.extend({
    id:z.number(),
})

// export const userResponseSchema = userReturnSchema
//     .omit({
//     password: true
// })

export const movieUpdateSchema = movieSchema.pick({name:true, price:true, description:true, duration:true}).partial()

export const allMoviesListSchema = z.array(moviesResponseSchema)


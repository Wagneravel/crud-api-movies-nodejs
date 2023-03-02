import { Request, Response } from "express";
import { QueryConfig } from "pg";
import format from "pg-format";
import { client } from "../../database";
import { AppError } from "../../erros";
import { iMovieResponse, movieResult } from "../../interfaces/movies.Interfaces";
import { moviesResponseSchema, movieUpdateSchema } from "../../schemas/movies.schemas";


export async function updateMovieService(movie:movieResult, id:number){
    
    const updatebleKeys = movieUpdateSchema.keyof().options

    if(!Object.keys(movie).length){
        throw new AppError(`At least one of those keys must be send: ${updatebleKeys}`)
    }

    const queryString: string = format(
        `
        UPDATE 
            movies
        SET
            (%I) = ROW(%L)
        WHERE 
            id = $1
        RETURNING *;     
        `,
        Object.keys(movie),
        Object.values(movie)
        
    ) 

    const queryConfig:QueryConfig = {
        text:queryString,
        values:[id]
    }


    const queryResult:movieResult = await client.query(queryConfig)
    const updatedMovie:iMovieResponse = moviesResponseSchema.parse(queryResult.rows[0])


    return updatedMovie
}
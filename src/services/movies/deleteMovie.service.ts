import { Request, Response } from "express";
import { QueryConfig } from "pg";
import format from "pg-format";
import { object } from "zod";
import { client } from "../../database";
import { iMovieResponse, movieResult } from "../../interfaces/movies.Interfaces";
import { moviesResponseSchema } from "../../schemas/movies.schemas";


export async function deleteMovieService(id:number){
    
    const queryString: string = format(
        `
        UPDATE 
            movies
        WHERE 
            id = $1
        RETURNING *;     
        `,
    ) 

    const queryConfig:QueryConfig = {
        text:queryString,
        values:[id]
    }

    const queryResult:movieResult = await client.query(queryConfig)
    const deleteMovie:iMovieResponse = moviesResponseSchema.parse(queryResult.rows[0])

    return deleteMovie
}

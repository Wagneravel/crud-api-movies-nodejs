import { NextFunction, query, Request, Response } from "express"
import { QueryConfig } from "pg"
import format from "pg-format"
import { client } from "../database"
import { iMovieResponse, movieResult } from "../interfaces/movies.Interfaces"


export async function verifyMovieIdExists(request:Request, response:Response, next: NextFunction): Promise<Response | void>{

    const movieId = request.params.id

    const queryString: string = 
        `
        SELECT 
            *
        FROM 
            movies
        WHERE 
            id = $1
        `;
        
    const queryConfig:QueryConfig = {
        text:queryString,
        values:[movieId]
    }
    const queryResult:movieResult = await client.query(queryConfig)
    const movie:iMovieResponse = queryResult.rows[0]

    if(!movie){
        return response.status(404).json({message:"Movie not found."})
    }

    next()
}
import { NextFunction, query, Request, Response } from "express"
import { QueryConfig } from "pg"
import format from "pg-format"
import { client } from "../database"
import { iMovieResponse, movieResult } from "../interfaces/movies.Interfaces"

export async function verifyMovieNameExists(request:Request, response:Response, next: NextFunction): Promise<Response | void>{

    const movieName = request.body.name

    if(!movieName && request.method == "PATCH"){
        next()
    }

    const queryString: string = 
        `
        SELECT 
            *
        FROM 
            movies
        WHERE 
            name = $1
        `;
        
    const queryConfig:QueryConfig = {
        text:queryString,
        values:[movieName]
    }
    const queryResult:movieResult = await client.query(queryConfig)
    const movie:iMovieResponse = queryResult.rows[0]

    if(movie){
        return response.status(409).json({message:"Movie already exists."})
    }

    next()
}
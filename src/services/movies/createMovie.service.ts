import { Request, Response } from "express";
import { QueryConfig } from "pg";
import format from "pg-format";
import { client } from "../../database";
import { iMovieResponse, iMovie, movieResult } from "../../interfaces/movies.Interfaces";
import { moviesResponseSchema } from "../../schemas/movies.schemas";

export async function createMovieService(movieDate:iMovie): Promise<iMovieResponse>{

    const queryString: string = format(
        `
        INSERT INTO 
            movies(%I)
        VALUES 
            (%L)
        RETURNING *;     
        `,
        Object.keys(movieDate),
        Object.values(movieDate)
    ) 

    const queryResult:movieResult = await client.query(queryString)
    const newMovie:iMovieResponse = moviesResponseSchema.parse(queryResult.rows[0])

    return newMovie
}
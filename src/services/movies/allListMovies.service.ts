import { Request, Response } from "express";
import { QueryConfig } from "pg";
import { client } from "../../database";
import { iMoviePagination, iMovieResponse, movieResult } from "../../interfaces/movies.Interfaces";
import { allMoviesListSchema } from "../../schemas/movies.schemas";


export async function allListMoviesService(a:any):Promise<iMoviePagination>{

    const {order, sort, page, perPage} = a.query

    const perPageValue:any = perPage === undefined || +perPage < 1 || typeof +perPage !== "number" ? 5 : +perPage
    const pageValue:any = page === undefined || +page < 1 || typeof +page !== "number" ? 1 : +page

    const pageOffset = perPageValue * (pageValue-1)
    
    const queryString: string = 
    `
    SELECT 
        *
    FROM 
        movies
        LIMIT $1 OFFSET $2    
    `;
    
    const queryConfig:QueryConfig = {
        text:queryString,
        values: [perPageValue, pageOffset]
    }
    
    const queryResult:movieResult = await client.query(queryConfig)

    const moviesPagination: iMoviePagination = {
    
        prevPage: pageValue <= 1 ? null: `http://localhost:3000/movies?page=${pageValue-1}&perPage=${perPageValue}`,
        nextPage: perPageValue > queryResult.rowCount ? null: `http://localhost:3000/movies?page=${pageValue+1}&perPage=${perPageValue}`,
        count: queryResult.rowCount,
        data: queryResult.rows
    }

    return moviesPagination
}



    

    
    //return response.status(200).json(moviesPagination)
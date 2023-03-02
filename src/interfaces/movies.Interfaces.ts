import { QueryResult } from "pg"

export interface iMovie {
    name: string,
    description?: string | null,
    duration: number,
    price: number
}

export interface iMovieResponse extends iMovie {

    id: number
}

export interface iMoviePagination {
    prevPage: string | null,
    nextPage: string | null,
    count: number,
    data: iMovieResponse[]
}


export type itemMovieRequiredKeys = "name" | "description" | "duration" | "price"

export type movieResult = QueryResult<iMovieResponse> 
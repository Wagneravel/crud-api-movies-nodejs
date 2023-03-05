import { movieSchema, returnMovieSchema, returnMultipleMoviesSchema, updateMovieSchema } from "../schemas/movie.schemas";
import { z } from "zod";
import { DeepPartial } from "typeorm";

export type iMovie = z.infer<typeof movieSchema>
export type iMovieReturn = z.infer<typeof returnMovieSchema>
export type iMoviesReturn = z.infer<typeof returnMultipleMoviesSchema>
//export type iMovieUpdade = DeepPartial<iMovie>
export type iMovieUpdade = z.infer<typeof updateMovieSchema>


// export interface Pagination {
//     prevPage: string | null;
//     nextPage: string | null;
//     count: number;
//     data: iMoviesReturn;
//   }

export type Pagination = {
  data: iMoviesReturn;
  prevPage: string | null;
  nextPage: string | null;
  count: number;
};

export type PaginationOptions = {
  page?: number;
  perPage?: number;
  sort?: "id" | "price" | "duration";
  order?: "ASC" | "DESC";
};
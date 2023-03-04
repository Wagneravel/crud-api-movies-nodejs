import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Movie } from "../../entities";
import { iMoviesReturn } from "../../interfaces/movies.Interfaces";
import { returnMultipleMoviesSchema } from "../../schemas/movie.schemas";

export const listMovieService = async (): Promise<iMoviesReturn> => {
    const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie)

    const findMovies: Array<Movie> = await movieRepository.find()

    const movies = returnMultipleMoviesSchema.parse(findMovies)

    return movies
}




// interface PaginationOptions {
//   page: number;
//   perPage: number;
//   order: "ASC" | "DESC";
//   sort: keyof Movie;
// }

// export class MoviesService {
//   async getMovies(
//     options: PaginationOptions
//   ): Promise<{ prevPage: number | null; nextPage: number | null; count: number; data: Movie[] }> {
//     const movieRepository = getRepository(Movie);
//     const { page, perPage, order, sort } = options;
//     const [movies, count] = await movieRepository.findAndCount({
//       skip: (page - 1) * perPage,
//       take: perPage,
//       order: { [sort]: order },
//     });

//     const prevPage = page > 1 ? page - 1 : null;
//     const nextPage = page * perPage < count ? page + 1 : null;

//     return {
//       prevPage,
//       nextPage,
//       count,
//       data: movies,
//     };
//   }
// }
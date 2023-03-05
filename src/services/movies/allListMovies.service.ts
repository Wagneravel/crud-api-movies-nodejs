import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Movie } from "../../entities";
import { iMoviesReturn, Pagination, PaginationOptions } from "../../interfaces/movies.Interfaces";
import { returnMultipleMoviesSchema } from "../../schemas/movie.schemas";

export const listMoviesService = async (query:any, baseUrl:string): Promise<Pagination> => {

    const { page, perPage, sort, order } = query

    const perPageValue:any = perPage === undefined || +perPage < 1 || isNaN(perPage) ? 5 : +perPage
    const pageValue:any = page === undefined || +page < 1 || isNaN(page) ? 1 : +page
  
    const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);
  
    const orderDirection = !order ? "ASC" : order.toUpperCase() ;
    
    const orderBy = sort === "price" && orderDirection ? {price:orderDirection} :  sort === "duration" && orderDirection ? {duration: orderDirection} : {id: orderDirection};
  
    const totalCount = await movieRepository.count();
    const skip = (pageValue - 1) * perPageValue;
    const take = perPageValue; 
  
    const [movies, moviesCount] = await movieRepository.findAndCount({
      order: orderBy,
      skip,
      take,
    });
  
    const pagination = {
      count: totalCount,
      prevPage: pageValue > 1 ? `http://localhost:3000${baseUrl}?page=${Number(pageValue) - 1}&perPage=${perPageValue}` : null,
      nextPage: skip + take < totalCount ? `http://localhost:3000${baseUrl}?page=${Number(pageValue) + 1}&perPage=${perPageValue}` : null,
      data: movies,
    };
    
    return pagination
}


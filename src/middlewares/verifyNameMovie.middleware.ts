import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { AppError } from "../errors";

export const checkIfNameMovieExistsMiddleware = async (req: Request, res: Response, next: NextFunction):Promise<void> => {

    const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie)
  
  
    const nameMovie = await movieRepository.findOne({
        where: {
            name: req.body.name
        }
    });

    if (nameMovie) {
        throw new AppError('this name already exists', 404)
    }
    return  next();

};

// import { Request, Response, NextFunction } from "express";
// import { getManager } from "typeorm";
// import { Movie } from "../entities";

// export const checkMovieNameExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
//   const { name } = req.body;

//   const movieRepository = getManager().getRepository(Movie);
//   const existingMovie = await movieRepository.findOne({ where: { name } });

//   if (existingMovie) {
//     return res.status(409).json({ message: "Movie with this name already exists." });
//   }

//   return next();
// };
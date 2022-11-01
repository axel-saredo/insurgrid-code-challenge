import { NextApiResponse } from 'next';
import { AppError } from './errors/customError';

// Interfaces
export interface ResponseFunctions {
  GET?: Function;
  POST?: Function;
  PUT?: Function;
  DELETE?: Function;
  PATCH?: Function;
  OPTIONS?: Function;
}

// Functions
export const catchError = (error: any, res: NextApiResponse) => {
  if (error instanceof AppError) {
    const err = error.serializeErrors();
    return res.status(error.statusCode).json(err);
  } else {
    return res
      .status(500)
      .json([{ message: `Internal Server Error: ${error}` }]);
  }
};

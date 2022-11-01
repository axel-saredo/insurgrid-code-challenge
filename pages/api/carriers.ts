import { NextApiRequest, NextApiResponse } from 'next';
import { catchError, ResponseFunctions } from '../../utils';
import carriersService from './services/carriers.service';

const requestHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const method: keyof ResponseFunctions = req.method as keyof ResponseFunctions;

  const methodHandler: ResponseFunctions = {
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      try {
        const carriers = await carriersService.getCarriers();
        return res.status(200).json(carriers);
      } catch (error) {
        catchError(error, res);
      }
    },
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      try {
        return res.status(201).json({ message: 'POST request' });
      } catch (error) {
        catchError(error, res);
      }
    },
    PATCH: async (req: NextApiRequest, res: NextApiResponse) => {
      try {
        return res.status(200).json({ message: 'PATCH request' });
      } catch (error) {
        catchError(error, res);
      }
    },
    DELETE: async (req: NextApiRequest, res: NextApiResponse) => {
      try {
        return res.status(200).json({ message: 'DELETE request' });
      } catch (error) {
        catchError(error, res);
      }
    },
  };

  const response = methodHandler[method];
  if (response) {
    response(req, res);
  } else {
    return res.status(400).json({ message: 'No response for this request' });
  }
};

export default requestHandler;

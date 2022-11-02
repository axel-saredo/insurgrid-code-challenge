import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { catchError, ResponseFunctions } from '../../utils';
import userService from './services/user.service';

const requestHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const method: keyof ResponseFunctions = req.method as keyof ResponseFunctions;

  const methodHandler: ResponseFunctions = {
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      try {
        const { username, password } = req.body;

        const user = await userService.checkIfUserExists(username);

        if (user) {
          const isSamePassword = comparePassword(password, user[0].password!);
          if (isSamePassword) {
            delete user[0].password;

            return res.status(200).json(user[0]);
          } else {
            return res.status(401).json({ message: 'Incorrect credentials' });
          }
        } else {
          return res.status(401).json({ message: 'Incorrect credentials' });
        }
      } catch (error) {
        catchError(error, res);
      }
    },
  };

  const comparePassword = (
    incomingPass: string,
    savedPass: string
  ): boolean => {
    let isCorrectPassword = false;
    if (incomingPass === savedPass) {
      isCorrectPassword = true;
      return isCorrectPassword;
    }

    isCorrectPassword = bcrypt.compareSync(incomingPass, savedPass);

    return isCorrectPassword;
  };

  const response = methodHandler[method];
  if (response) {
    response(req, res);
  } else {
    return res.status(400).json({ message: 'No response for this request' });
  }
};

export default requestHandler;

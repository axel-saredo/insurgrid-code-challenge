import { QueryTypes, Sequelize } from 'sequelize';
import db from '../../../db/connect';
import { UserModel } from '../../../utils';

class UserService {
  sequelize: Sequelize;

  constructor() {
    this.sequelize = db;
  }

  async checkIfUserExists(username: string): Promise<UserModel[] | null> {
    const user: UserModel[] = await this.sequelize.query(
      `SELECT id as uid, carrier_id, username, password 
       FROM carrier_accounts 
       WHERE username = '${username}'`,
      {
        type: QueryTypes.SELECT,
      }
    );

    if (user && user.length === 0) {
      return null;
    }

    return user;
  }
}

const userService = new UserService();

export default userService;

import { QueryTypes, Sequelize } from 'sequelize';
import db from '../../../db/connect';

type Carrier = {
  id?: string;
  name: string;
};

class CarriersService {
  sequelize: Sequelize;

  constructor() {
    this.sequelize = db;
  }

  async getCarriers(): Promise<Carrier[]> {
    const sql = `
        SELECT name
        FROM carriers
    `;

    const data: any = await this.sequelize.query(sql, {
      type: QueryTypes.SELECT,
    });

    return data;
  }
}

const carriersService = new CarriersService();

export default carriersService;

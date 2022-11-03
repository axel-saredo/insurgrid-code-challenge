import { QueryTypes, Sequelize } from 'sequelize';
import db from '../../../db/connect';
import { Carrier } from '../../../utils';

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

  async getCarrierById(id: string): Promise<Carrier[]> {
    const sql = `
        SELECT *
        FROM carriers
        WHERE id = '${id}'
    `;

    const data: any = await this.sequelize.query(sql, {
      type: QueryTypes.SELECT,
    });

    return data;
  }
}

const carriersService = new CarriersService();

export default carriersService;

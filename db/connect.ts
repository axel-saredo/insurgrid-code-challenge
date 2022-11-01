import { Sequelize } from 'sequelize';

class Database {
  private static instance: Database;
  public sequelize: Sequelize;

  constructor() {
    this.sequelize = new Sequelize(
      process.env.DATABASE_CONNECTION_STRING || '',
      {
        dialect: 'postgres',
        dialectOptions: {},
      }
    );
  }

  public static getInstance(): Database {
    if (!this.instance) {
      this.instance = new Database();
    }

    return this.instance;
  }
}

const instance = Database.getInstance();
const db = instance.sequelize;

export default db;

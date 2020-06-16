import { Sequelize } from "sequelize-typescript";

const { DB_DATABASE, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: "postgres",
    logging: false,
    models: [`${__dirname}/../models`],
});

// sequelize.sync({ force: true });
export { sequelize };

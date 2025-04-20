import { Sequelize } from "sequelize";

const db = new Sequelize('notedb', 'root', '', {
    host: '34.57.165.209',
    dialect: 'mysql'
});

export default db;
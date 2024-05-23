import { Sequelize } from "sequelize";

const db = new Sequelize('auth_db', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql'
})

export default db;
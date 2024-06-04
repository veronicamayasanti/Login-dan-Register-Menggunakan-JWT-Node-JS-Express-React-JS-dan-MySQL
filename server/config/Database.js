import { Sequelize } from "sequelize";

const db = new Sequelize('auth_db', 'root', '123456', { //nama db, username, password
    host: 'localhost',
    dialect: 'mysql'
})

export default db;
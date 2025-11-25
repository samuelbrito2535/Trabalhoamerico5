const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "tarefas_app"
});

module.exports = pool;

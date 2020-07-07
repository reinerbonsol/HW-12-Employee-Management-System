const mysql = require("mysql");
const { start } = require("repl");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "rootpass",
    database: "employees_DB"
});

connection.connect((err) => {
    if (err) throw err;
    console.log("\n WELCOME TO EMPLOYEE TRACKER \n");
});

module.exports = connection;
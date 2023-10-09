// Based on: https://www.w3schools.com/nodejs/nodejs_mysql.asp
// docker run --name=mysql4 -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root -d mysql:latest
const mysql = require('mysql');

const mysqlQuery = async (sql) => {
    const connection = await connect();
    return new Promise((resolve, reject) => {
        return connection.query(sql, function (error, results, fields) {
            if (error) {
                reject(error);
            }
            resolve(results);
        });
    });
}

async function connect() {
    const connection = mysql.createConnection({
        host: "127.0.0.1",
        user: "root",
        password: "secret",
        database: "todo",
        multipleStatements: true,
    });

    return new Promise((resolve, reject) => {
        connection.connect(err => {
            return err ? reject(err) : resolve(connection);
        });
    });
}

module.exports = mysqlQuery;
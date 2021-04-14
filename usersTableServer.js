const express = require("express");
const app = express();
const mssql = require("mssql/msnodesqlv8");
const dbConfig = require("./dbconfig");

function getUsers() {
    const pool = new mssql.ConnectionPool(dbConfig.config);
    pool.connect().then(() => {
        pool.request().query("SELECT * FROM dbo.Users", function(err, result) {
            console.log(result.recordset);
        });
    });
    mssql.close();
    return result.recordset;
};

module.exports.getUsers = getUsers;
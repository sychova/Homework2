const mssql = require("mssql/msnodesqlv8");
const dbConfig = require("./dbconfig");

const pool = new mssql.ConnectionPool(dbConfig.config);

function getUsers(req, res) {
    pool.connect(() => {
        var sql = "SELECT * FROM dbo.Users";
        pool.query(sql, function(err, result) {
            console.log(result.recordset);
            res.render("index.pug", { users: result.recordset });
        });
        mssql.close();
    });
};

function deleteUser(req, res) {
    pool.connect().then(() => {
        var sql = "DELETE FROM dbo.Users WHERE UserID=" + parseInt(req);
        pool.query(sql);
        mssql.close();
    });
};

function editUser(req, res) {
    pool.connect().then(() => {
        var sql = "SELECT * FROM dbo.Users WHERE UserID=" + parseInt(req);
        pool.query(sql, function(err, result) {
            console.log(result.recordset);
            res.send(result.recordset);
        });
        mssql.close();
    });
};

module.exports.getUsers = getUsers;
module.exports.deleteUser = deleteUser;
module.exports.editUser = editUser;
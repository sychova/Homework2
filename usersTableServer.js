const mssql = require("mssql/msnodesqlv8");
const dbConfig = require("./dbconfig");

const pool = new mssql.ConnectionPool(dbConfig.config);

function getUsers() {
    pool.connect(() => {
        var sql = "SELECT * FROM dbo.Users";
        pool.query(sql, function(err, result) {
            // console.log(result.recordset);
            // console.log(ttt);
            var qqq = JSON.stringify(result.recordset);
            // console.log(qqq);
            // res.render("index.pug", { users: result.recordset });
            // res.send(qqq);
            return qqq;
        });
        mssql.close();
    });
};

function loadUsersPage(req, res) {
    var qqq = getUsers();
    console.log(qqq);
    // res.render("index.pug", { users: qqq });
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
module.exports.loadUsersPage = loadUsersPage;
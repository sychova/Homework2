const mssql = require("mssql/msnodesqlv8");
const dbConfig = require("./dbconfig");

const pool = new mssql.ConnectionPool(dbConfig.config);

function getUsers(req, res) {
    pool.connect().then(() => {
        var sql = `SELECT * FROM dbo.Users`;
        pool.query(sql, function(err, result) {
            res.send(result.recordset);
        });
        mssql.close();
    });
};

function loadUsersPage(req, res) {
    pool.connect(() => {
        var sql = "SELECT * FROM dbo.Users";
        pool.query(sql, function(err, result) {
            res.render("index.pug", { users: result.recordset });
        });
        mssql.close();
    });
};

function createUser(req, res) {
    console.log(Object.values(req));
    pool.connect().then(() => {
        var sql = "INSERT INTO dbo.Users(FirstName, LastName, Age, Phone, Email, Gender) VALUES ?";
        var values = [Object.values(req)];
        // VALUES('${req.FirstName}', '${req.LastName}', '${req.Age}', '${req.Phone}', '${req.Email}', '${req.Gender}')
        // "INSERT INTO `users`(`name`,`age`,`email`) VALUES(?, ?, ?)",[_name, _age, _email]
        pool.query(sql, [values]);
        mssql.close();
    });
};

function deleteUser(req, res) {
    pool.connect().then(() => {
        var sql = `DELETE FROM dbo.Users WHERE UserID = ${parseInt(req)}`;
        pool.query(sql);
        mssql.close();
    });
};

function editUser(req, res) {
    pool.connect().then(() => {
        var sql = `SELECT * FROM dbo.Users WHERE UserID = ${parseInt(req)}`;
        pool.query(sql, function(err, result) {
            res.send(result.recordset[0]);
        });
        mssql.close();
    });
};

function updateUser(req) {
    pool.connect().then(() => {
        var sql = `
        UPDATE dbo.Users SET
        FirstName = '${req.FirstName}',
        LastName = '${req.LastName}',
        Age = '${req.Age}',
        Phone = '${req.Phone}',
        Email = '${req.Email}',
        Gender = '${req.Gender}'
        WHERE UserID = ${req.Id}
        `;
        pool.query(sql);
        mssql.close();
    });
};

module.exports.getUsers = getUsers;
module.exports.deleteUser = deleteUser;
module.exports.editUser = editUser;
module.exports.loadUsersPage = loadUsersPage;
module.exports.updateUser = updateUser;
module.exports.createUser = createUser;
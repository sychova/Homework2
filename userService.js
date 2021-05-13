const mssql = require("mssql/msnodesqlv8");
const dbConfig = require("./dbconfig");

const pool = new mssql.ConnectionPool(dbConfig.config);

function getUsers(req, res) {
    console.log(typeof req);
    pool.connect().then(() => {
        if (typeof req == "object") {
            var sql = `SELECT * FROM dbo.Users`;
        } else {
            var sql = `SELECT * FROM dbo.Users WHERE FirstName LIKE @FirstName`;
        }
        pool.request()
            .input("FirstName", mssql.VarChar, `%${req}%`)
            .query(sql, function(err, result) {
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
    var sql = "INSERT INTO dbo.Users VALUES (@FirstName, @LastName, @Age, @Phone, @Email, @Gender)";
    pool.connect().then(() => {
        pool.request()
            .input("FirstName", mssql.VarChar, `${req.FirstName}`)
            .input("LastName", mssql.VarChar, `${req.LastName}`)
            .input("Age", mssql.VarChar, `${req.Age}`)
            .input("Phone", mssql.VarChar, `${req.Phone}`)
            .input("Email", mssql.VarChar, `${req.Email}`)
            .input("Gender", mssql.VarChar, `${req.Gender}`)
            .query(sql);
    });
};

function deleteUser(req, res) {
    pool.connect().then(() => {
        var sql = "DELETE FROM dbo.Users WHERE UserID = @UserID";
        pool.request()
            .input("UserID", mssql.Int, `${parseInt(req)}`)
            .query(sql);
        mssql.close();
    });
};

function editUser(req, res) {
    pool.connect().then(() => {
        var sql = "SELECT * FROM dbo.Users WHERE UserID = @UserID";
        pool.request()
            .input("UserID", mssql.Int, `${parseInt(req)}`)
            .query(sql, function(err, result) {
                res.send(result.recordset[0]);
            });
        mssql.close();
    });
};

function updateUser(req) {
    pool.connect().then(() => {
        var sql = `
        UPDATE dbo.Users SET
        FirstName = @FirstName,
        LastName = @LastName,
        Age = @Age,
        Phone = @Phone,
        Email = @Email,
        Gender = @Gender
        WHERE UserID = @UserID
        `;
        pool.request()
            .input("UserID", mssql.Int, `${req.Id}`)
            .input("FirstName", mssql.VarChar, `${req.FirstName}`)
            .input("LastName", mssql.VarChar, `${req.LastName}`)
            .input("Age", mssql.VarChar, `${req.Age}`)
            .input("Phone", mssql.VarChar, `${req.Phone}`)
            .input("Email", mssql.VarChar, `${req.Email}`)
            .input("Gender", mssql.VarChar, `${req.Gender}`)
            .query(sql);
        mssql.close();
    });
};

module.exports.getUsers = getUsers;
module.exports.deleteUser = deleteUser;
module.exports.editUser = editUser;
module.exports.loadUsersPage = loadUsersPage;
module.exports.updateUser = updateUser;
module.exports.createUser = createUser;
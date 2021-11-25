const mssql = require("mssql/msnodesqlv8");
const dbConfig = require("./dbconfig");
const { sorterBy, sorterDirection } = require("./userServiceSQLHelper");

const pool = new mssql.ConnectionPool(dbConfig.config);

function paginateUsers(req, res) {
    pool.connect(() => {
        var sql = "SELECT * FROM dbo.Users";
        pool.query(sql, function(err, result) {
            var page = req;
            var limit = 5;
            var startIndex = (page - 1) * limit;
            var endIndex = page * limit;
            var resultUsers = result.recordset.slice(startIndex, endIndex);
            res.send(resultUsers);
        });
        mssql.close();
    });
};

function getUsers(req, res) {
    var sortBy = sorterBy(req.sorting);
    var sortDirection = sorterDirection(req.order);
    pool.connect().then(() => {
        if (req.filter) {
            var sql = `
            SELECT *
            FROM dbo.Users
            WHERE FirstName LIKE @Search OR LastName LIKE @Search OR Age LIKE @Search OR Phone LIKE @Search OR Email LIKE @Search OR Gender LIKE @Search
            ORDER BY ${sortBy} ${sortDirection}
            OFFSET @Offset ROWS
            FETCH FIRST @Size ROWS ONLY
            `;
        } else {
            var sql = `
            SELECT *
            FROM dbo.Users
            ORDER BY ${sortBy} ${sortDirection}
            OFFSET @Offset ROWS
            FETCH FIRST @Size ROWS ONLY
            `;
        }
        pool.request()
            .input("Search", mssql.VarChar, `%${req.filter}%`)
            .input("Offset", mssql.Int, `${(parseInt(req.page) - 1) * parseInt(req.size)}`)
            .input("Size", mssql.Int, `${parseInt(req.size)}`)
            .query(sql, function(err, result) {
                res.send(result.recordset);
            });
        mssql.close();
    });
};

function createUser(req, res) {
    var sql = `
    INSERT INTO dbo.Users (FirstName, LastName, Age, Phone, Email, Gender)
    VALUES (@FirstName, @LastName, @Age, @Phone, @Email, @Gender)
    `;
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
        var sql = `
        DELETE FROM dbo.Users
        WHERE UserID = @UserID
        `;
        pool.request()
            .input("UserID", mssql.Int, `${parseInt(req)}`)
            .query(sql);
        mssql.close();
    });
};

function editUser(req, res) {
    pool.connect().then(() => {
        var sql = `SELECT *
        FROM dbo.Users
        WHERE UserID = @UserID
        `;
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

module.exports = {
    getUsers,
    deleteUser,
    editUser,
    updateUser,
    createUser,
    paginateUsers
}
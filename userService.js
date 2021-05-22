const mssql = require("mssql/msnodesqlv8");
const dbConfig = require("./dbconfig");

const pool = new mssql.ConnectionPool(dbConfig.config);


function loadUsersPage(req, res) {
    res.render("index.pug");
};

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
    pool.connect().then(() => {
        console.log(req.sorting);
        console.log(typeof req.sorting);
        if (req.filter) {
            // var sql = `
            // SELECT *
            // FROM dbo.Users
            // WHERE FirstName LIKE @Search OR LastName LIKE @Search OR Age LIKE @Search OR Phone LIKE @Search OR Email LIKE @Search OR Gender LIKE @Search
            // ORDER BY @Sorting
            // OFFSET @Offset ROWS
            // FETCH NEXT @Size ROWS ONLY
            // `;
            var sql = `
            SELECT *
            FROM dbo.Users
            WHERE FirstName LIKE @Search OR LastName LIKE @Search OR Age LIKE @Search OR Phone LIKE @Search OR Email LIKE @Search OR Gender LIKE @Search
            ORDER BY UserID
            `;
        } else {
            // var sql = `
            // SELECT *
            // FROM dbo.Users
            // ORDER BY UserID
            // OFFSET @Offset ROWS
            // FETCH FIRST @Size ROWS ONLY
            // `;
            var sql = `
            SELECT *
            FROM dbo.Users
            ORDER BY UserID
            `;
        }
        pool.request()
            .input("Search", mssql.VarChar, `%${req.filter}%`)
            .input("Sorting", mssql.VarChar, `%${req.sorting}%`)
            .input("Offset", mssql.Int, `${(parseInt(req.page) - 1) * parseInt(req.size)}`)
            .input("Size", mssql.Int, `${parseInt(req.size)}`)
            .query(sql, function(err, result) {
                if (req.sorting) {
                    if (req.order == "ASC") {
                        var sortedUsers = result.recordset.sort(function(a, b) {
                            return a[req.sorting] - b[req.sorting];
                        });
                        var resultingUsers = sortedUsers.slice(`${(parseInt(req.page) - 1) * parseInt(req.size)}`, `${parseInt(req.size) * parseInt(req.page)}`);
                    } else if (req.order == "DESC") {
                        var sortedUsers = result.recordset.sort(function(a, b) {
                            return b[req.sorting] - a[req.sorting];
                        });
                        var resultingUsers = sortedUsers.slice(`${(parseInt(req.page) - 1) * parseInt(req.size)}`, `${parseInt(req.size) * parseInt(req.page)}`);
                    }
                } else {
                    var resultingUsers = result.recordset.slice(`${(parseInt(req.page) - 1) * parseInt(req.size)}`, `${parseInt(req.size) * parseInt(req.page)}`);
                }
                res.send(resultingUsers);
            });
        mssql.close();
    });
};

function createUser(req, res) {
    var sql = `
    INSERT INTO dbo.Users
    VALUES (@FirstName, @LastName, @Age, @Phone, @Email, @Gender)
    `;
    pool.connect().then(() => {
        pool.request()
            .input("Search", mssql.VarChar, `${req.FirstName}`)
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

module.exports.getUsers = getUsers;
module.exports.deleteUser = deleteUser;
module.exports.editUser = editUser;
module.exports.loadUsersPage = loadUsersPage;
module.exports.updateUser = updateUser;
module.exports.createUser = createUser;
module.exports.paginateUsers = paginateUsers;
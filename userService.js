const mssql = require("mssql/msnodesqlv8");
const dbConfig = require("./dbconfig");
const { sorterBy, sorterDirection } = require("./userServiceSQLHelper");

const pool = new mssql.ConnectionPool(dbConfig.config);

const paginateUsers = (req, res) => {
    pool.connect(() => {
        var sql = "SELECT * FROM dbo.users";
        pool.query(sql, (err, result) => {
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

const getUsers = (req, res) => {
    var sortBy = sorterBy(req.sorting);
    var sortDirection = sorterDirection(req.order);
    pool.connect().then(() => {
        if (req.filter) {
            var sql = `
            SELECT *
            FROM dbo.users
            WHERE first_name LIKE @Search OR last_name LIKE @Search OR age LIKE @Search OR phone LIKE @Search OR email LIKE @Search OR gender LIKE @Search
            ORDER BY ${sortBy} ${sortDirection}
            OFFSET @Offset ROWS
            FETCH FIRST @Size ROWS ONLY
            `;
        } else {
            var sql = `
            SELECT *
            FROM dbo.users
            ORDER BY ${sortBy} ${sortDirection}
            OFFSET @Offset ROWS
            FETCH FIRST @Size ROWS ONLY
            `;
        }
        pool.request()
            .input("Search", mssql.VarChar, `%${req.filter}%`)
            .input("Offset", mssql.Int, `${(parseInt(req.page) - 1) * parseInt(req.size)}`)
            .input("Size", mssql.Int, `${parseInt(req.size)}`)
            .query(sql, (err, result) => {
                res.send(result.recordset);
            });
        mssql.close();
    });
};

const createUser = (req, res) => {
    var sql = `
    INSERT INTO dbo.users (first_name, last_name, age, phone, email, gender)
    VALUES (@first_name, @last_name, @age, @phone, @email, @gender)
    `;
    pool.connect().then(() => {
        pool.request()
            .input("first_name", mssql.VarChar, `${req.FirstName}`)
            .input("last_name", mssql.VarChar, `${req.LastName}`)
            .input("age", mssql.VarChar, `${req.Age}`)
            .input("phone", mssql.VarChar, `${req.Phone}`)
            .input("email", mssql.VarChar, `${req.Email}`)
            .input("gender", mssql.VarChar, `${req.Gender}`)
            .query(sql);
    });
};

const deleteUser = (req, res) => {
    pool.connect().then(() => {
        var sql = `
        DELETE FROM dbo.users
        WHERE user_id = @user_id
        `;
        pool.request()
            .input("user_id", mssql.Int, `${parseInt(req)}`)
            .query(sql);
        mssql.close();
    });
};

function editUser (req, res) {
    pool.connect().then(() => {
        var sql = `SELECT *
        FROM dbo.users
        WHERE user_id = @user_id
        `;
        pool.request()
            .input("user_id", mssql.Int, `${parseInt(req)}`)
            .query(sql, (err, result) => {
                res.send(result.recordset[0]);
            });
            
        mssql.close();
    });
};

function updateUser (req) {
    pool.connect().then(() => {
        var sql = `
        UPDATE dbo.users SET
        first_name = @first_name,
        last_name = @last_name,
        age = @age,
        phone = @phone,
        email = @email,
        gender = @gender
        WHERE user_id = @user_id
        `;
        pool.request()
            .input("user_id", mssql.Int, `${req.Id}`)
            .input("first_name", mssql.VarChar, `${req.FirstName}`)
            .input("last_name", mssql.VarChar, `${req.LastName}`)
            .input("age", mssql.VarChar, `${req.Age}`)
            .input("phone", mssql.VarChar, `${req.Phone}`)
            .input("email", mssql.VarChar, `${req.Email}`)
            .input("gender", mssql.VarChar, `${req.Gender}`)
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

const mssql = require("mssql/msnodesqlv8")
const { config } = require("./dbconfig")
const { sorterBy, sorterDirection } = require("./userServiceSQLHelper")

const pool = new mssql.ConnectionPool(config)

const getUsers = (order) => {
    return new Promise ((resolve, reject) => {
        var sortBy = sorterBy(order.sorting)
        var sortDirection = sorterDirection(order.order)
        pool.connect().then(() => {
            if (order.filter) {
                var sql = `
                SELECT *
                FROM dbo.users
                WHERE first_name LIKE @Search OR last_name LIKE @Search OR age LIKE @Search OR phone LIKE @Search OR email LIKE @Search OR gender LIKE @Search
                ORDER BY ${sortBy} ${sortDirection}
                OFFSET @Offset ROWS
                FETCH FIRST @Size ROWS ONLY
                `
            } else {
                var sql = `
                SELECT *
                FROM dbo.users
                ORDER BY ${sortBy} ${sortDirection}
                OFFSET @Offset ROWS
                FETCH FIRST @Size ROWS ONLY
                `
            }
            pool.request()
                .input("Search", mssql.VarChar, `%${order.filter}%`)
                .input("Offset", mssql.Int, `${(parseInt(order.page) - 1) * parseInt(order.size)}`)
                .input("Size", mssql.Int, `${parseInt(order.size)}`)
                .query(sql, (err, result) => {
                    resolve(result.recordset)
                })
            mssql.close()
        })
    })
}

const createUser = (user) => {
    return new Promise((resolve, reject) => {
        var sql = `
        INSERT INTO dbo.users (first_name, last_name, age, phone, email, gender)
        VALUES (@first_name, @last_name, @age, @phone, @email, @gender)
        `
        pool.connect().then(() => {
            pool.request()
                .input("first_name", mssql.VarChar, `${user.firstName}`)
                .input("last_name", mssql.VarChar, `${user.lastName}`)
                .input("age", mssql.VarChar, `${user.age}`)
                .input("phone", mssql.VarChar, `${user.phone}`)
                .input("email", mssql.VarChar, `${user.email}`)
                .input("gender", mssql.VarChar, `${user.gender}`)
                .query(sql)
            mssql.close()
        })
        resolve()
    })
}

const deleteUser = (userID) => {
    return new Promise ((resolve, reject) => {
        pool.connect().then(() => {
            var sql = `
            DELETE FROM dbo.users
            WHERE user_id = @user_id
            `
            pool.request()
                .input("user_id", mssql.Int, `${parseInt(userID)}`)
                .query(sql)
            mssql.close()
        })
        resolve()
    })
}

function editUser (id) {
    return new Promise((resolve, reject) => {
        pool.connect().then(() => {
            var sql = `SELECT *
            FROM dbo.users
            WHERE user_id = @user_id
            `
            pool.request()
                .input("user_id", mssql.Int, `${parseInt(id)}`)
                .query(sql, (err, result) => {
                    resolve(result.recordset[0])
                })
            mssql.close()
        })
    })
}

function updateUser (user) {
    return new Promise((resolve, reject) => {
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
            `
            pool.request()
                .input("user_id", mssql.Int, `${user.id}`)
                .input("first_name", mssql.VarChar, `${user.firstName}`)
                .input("last_name", mssql.VarChar, `${user.lastName}`)
                .input("age", mssql.VarChar, `${user.age}`)
                .input("phone", mssql.VarChar, `${user.phone}`)
                .input("email", mssql.VarChar, `${user.email}`)
                .input("gender", mssql.VarChar, `${user.gender}`)
                .query(sql)
            mssql.close()
        })
        resolve()
    })
}

module.exports = {
    getUsers,
    deleteUser,
    editUser,
    updateUser,
    createUser
}

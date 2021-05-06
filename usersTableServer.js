const mssql = require("mssql/msnodesqlv8");
const dbConfig = require("./dbconfig");

const pool = new mssql.ConnectionPool(dbConfig.config);

function getUsers(req, res) {
    pool.connect().then(() => {
        var sql = "SELECT * FROM dbo.Users";
        pool.query(sql, function(err, result) {
            var usersList = result.recordset;
            var usersRows = "";
            for (i = 0; i < usersList.length; i++) {
                usersRows += `
                <tr>
                    <td>${usersList[i].FirstName}</td>
                    <td>${usersList[i].LastName}</td>
                    <td>${usersList[i].Age}</td>
                    <td>${usersList[i].Phone}</td>
                    <td>${usersList[i].Email}</td>
                    <td>${usersList[i].Gender}</td>
                    <td>
                        <button class="editUser btn btn-primary" type="button" data-toggle="modal" data-target="#usersModal" data-userid="${usersList[i].UserID}">Edit</button>
                        <button class="deleteUser btn btn-danger" data-userid="${usersList[i].UserID}">Delete</button>
                    </td>
                </tr>`
            }
            res.send(usersRows);
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
    pool.connect().then(() => {
        var sql = `
        INSERT INTO dbo.Users(FirstName, LastName, Age, Phone, Email, Gender)
        VALUES('${req.FirstName}', '${req.LastName}', '${req.Age}', '${req.Phone}', '${req.Email}', '${req.Gender}')
        `;
        pool.query(sql);
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
const mssql = require("mssql/msnodesqlv8");
const dbConfig = require("./dbconfig");

function getUsers(req, res) {
    const pool = new mssql.ConnectionPool(dbConfig.config);
    pool.connect().then(() => {
        pool.request().query("SELECT * FROM dbo.Users", function(err, result) {
            console.log(result.recordset);
            let ttt = result.recordset;
            res.render("index.pug", { users: ttt });
        });
    });
    mssql.close();
};

module.exports.getUsers = getUsers;
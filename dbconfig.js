const mssql = require("mssql/msnodesqlv8");

const config = {
    server: "(LocalDB)\\MSSQLLocalDB",
    database: "Homework2",
    port: "1433",
    driver: "msnodesqlv8",
    options: {
        trustedConnection: true
    }
};

function getUsers(req, res) {
    const pool = new mssql.ConnectionPool(config);
    pool.connect().then(() => {
        pool.request().query("SELECT * FROM dbo.Users", function(err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result.recordset);
                res.sendStatus(200);
            }
        });
    });
    mssql.close();
};

module.exports.getUsers = getUsers;
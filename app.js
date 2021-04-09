const express = require("express");
const app = express();
const mssql = require("mssql/msnodesqlv8");

app.get("/", function(req, res) {
    require("msnodesqlv8");

    const config = {
        server: "(LocalDB)\\MSSQLLocalDB",
        database: "Homework2",
        port: "1433",
        driver: "msnodesqlv8",
        options: {
            trustedConnection: true
        }
    };

    console.log("Starting");

    const pool = new mssql.ConnectionPool(config);
    pool.connect().then(() => {
        pool.request().query("SELECT * FROM Users", function(err, recordset) {
            if (err) res.send(err);
            else {
                res.send(recordset);
            }
        });
    });
    mssql.close();
});

// Showing pages
// app.get("/", function(req, res) {
//     res.send("Hello world!");
// })

// app.get("/siski", function(req, res) {
//     res.sendFile(__dirname + "/indexx.html");
// })

// myfirstmodule.log("pizdec");

app.listen(3000, function() {
    console.log("Listening on port 3000");
})
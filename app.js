const express = require("express");
const app = express();
const dbconfig = require("./dbconfig");

app.use(express.static('public'));

app.get("/getUsers", dbconfig.getUsers);

// app.get("/getUsers", function(req, res) {
//     require("msnodesqlv8");

//     const config = {
//         server: "(LocalDB)\\MSSQLLocalDB",
//         database: "Homework2",
//         port: "1433",
//         driver: "msnodesqlv8",
//         options: {
//             trustedConnection: true
//         }
//     };

//     const pool = new mssql.ConnectionPool(config);
//     pool.connect().then(() => {
//         pool.request().query("SELECT * FROM dbo.Users", function(err, result) {
//             if (err) {
//                 res.send(err);
//             } else {
//                 res.send(result);
//                 res.sendStatus(200);
//             }
//         });
//     });
//     mssql.close();
// });

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
})

app.listen(3000, function() {
    console.log("Listening on port 3000");
})
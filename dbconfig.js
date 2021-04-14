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

module.exports.config = config;
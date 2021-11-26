const config = {
    server: "(LocalDB)\\MSSQLLocalDB",
    database: process.env.DB_INSTANCE,
    port: process.env.DB_PORT,
    driver: "msnodesqlv8",
    options: {
        trustedConnection: true
    }
};

module.exports.config = config;

// DB_SERVER='(LocalDB)\\MSSQLLocalDB'
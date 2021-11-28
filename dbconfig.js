const config = {
    server: process.env.DB_SERVER,
    database: process.env.DB_INSTANCE,
    port: process.env.DB_PORT,
    driver: "msnodesqlv8",
    options: {
        trustedConnection: true
    }
}

module.exports = {
    config
}

var data = {
  development: {
    username: "root",
    password: null,
    database: "fitness_db",
    host: "localhost",
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: null,
    database: "testdb",
    host: "localhost",
    dialect: "mysql",
    logging: false
  },
  production: {
    // eslint-disable-next-line camelcase
    use_env_variable: "JAWSDB_URL",
    username: "jrd7u8z37s1d9ykh",
    host: "q57yawiwmnaw13d2.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    database: "o1dtamgmnwj7i8rb",
    password: "lgzrfylez1zd5lwl"
  }
};

module.exports = data;

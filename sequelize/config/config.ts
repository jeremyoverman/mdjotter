let config = {
  "test": {
    "dialect": "sqlite",
    "timezone": "+00:00",
    "operatorsAliases": false
  },
  "development": {
    "username": "root",
    "password": "testpassword",
    "database": "mdjotter",
    "host": "localhost",
    "port": 3306,
    "dialect": "mysql",
    "logging": false,
    "force": true,
    "timezone": "+00:00",
    "operatorsAliases": false
  },
  "production": {
    "username": process.env.MDJOTTER_DB_USER,
    "password": process.env.MDJOTTER_DB_PASS,
    "database": process.env.MDJOTTER_DB_DB,
    "host": process.env.MDJOTTER_DB_HOST,
    "port": 3306,
    "dialect": "mysql",
    "logging": false,
    "force": true,
    "timezone": "+00:00",
    "operatorsAliases": false
  }
}

export default config;
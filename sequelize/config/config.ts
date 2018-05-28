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
    "username": "",
    "password": "",
    "database": "",
    "host": "",
    "port": 3306,
    "dialect": "mysql",
    "logging": false,
    "force": true,
    "timezone": "+00:00",
    "operatorsAliases": false
  }
}

export default config;
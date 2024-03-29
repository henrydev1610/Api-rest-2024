const path = require("path");

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, "src", "Database", "databse.db")
    },
    pool:{
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys=OFF", cb)
    },
    migrations:{
      directory: path.resolve(__dirname, "src", "Database", "knex", "migrations")
    },
    useNullAsDefault: true
  }

};
//npx knex migrate:make createNotes -> para criar a migrate de notas dentro da pasta migrate que esta dentro de knex, que esta dentro da pasta database
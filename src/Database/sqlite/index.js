// npm install sqlite3 sqlite --save
const sqlite3 = require('sqlite3')
const sqlite = require('sqlite')
const path = require('path')


async function sqlConnection(){
    const database = await sqlite.open({
        filename: path.resolve(__dirname, "..", "databse.db" ),
        driver: sqlite3.Database
    });
     
     return database
}


module.exports = sqlConnection;


// codigo de reuso
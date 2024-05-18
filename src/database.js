const { MongoClient } = require('mongodb')
let dbConnection
module.exports = {
    // intially connect to the database
    connectToDB: (callback_func) => {
        MongoClient.connect('mongodb://127.0.0.1:27017/Hawkhack_db').then((client) => {
            dbConnection = client.db()
            return callback_func()
        }).catch(err => {
            console.log(err);
            return callback_func(err)
        })
    },
    // return database's connection, allow to communicate with the db
    getDB: () => dbConnection,
}
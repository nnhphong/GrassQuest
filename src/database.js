const { MongoClient } = require('mongodb')
let dbConnection

module.exports = {
    // intially connect to the database
    connectToDB: (callback_func) => {
        
        const uri = "mongodb+srv://mp2702737:JFMewLsSKRwPieXn@grasstoucher.pbajss0.mongodb.net/?retryWrites=true&w=majority&appName=GrassToucher";
        
        MongoClient.connect("mongodb+srv://mp2702737:JFMewLsSKRwPieXn@grasstoucher.pbajss0.mongodb.net/?retryWrites=true&w=majority&appName=GrassToucher").then((client) => {
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

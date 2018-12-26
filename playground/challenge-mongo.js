const {MongoClient, ObjectID} = require('mongodb')


MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}, (err, client) => {
    if(err) {
        return console.log('Unable to connect to database')
    }
    console.log('connected to the DB server')

    const db =  client.db('TodoApp')

    db.collection('Users').insertOne({name: 'Saif'}).then((res) => {
        console.log(res)
    })
    // client.close()
})
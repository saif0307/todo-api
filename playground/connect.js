const {MongoClient, ObjectID} = require('mongodb')


MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true},(err, client) => {
    if(err) {
        return console.log('Unable to connect to MongoDB server')
    }
    console.log('connected to Database server')

    const db = client.db('TodoApp')

    // db.collection('Todos').insertOne({
    //     text: 'go to Gym',
    //     completed: false
    // },(err, results) => {
    //     if(err) {
    //         return console.log('Unable to insert to Database')
    //     }
    //     console.log(JSON.stringify(results.ops, undefined, 2))
    // })

    db.collection('Users').insertOne({
        name: 'Saif',
        age: 19,
        location: 'Abbottabad'
    }, (err, results) => {
        if(err) {
            return console.log('Unable to add to MongoDB')
        }
        console.log(JSON.stringify(results.ops, undefined, 2))
    })
    client.close()
})

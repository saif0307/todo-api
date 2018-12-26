const {MongoClient, ObjectID} =  require ('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp',{useNewUrlParser: true}, (error, client) => {
    if(error) {
         return console.log('unable to connect to DB server', error)
    }
    console.log('Connected to DB server')

    const db = client.db('TodoApp')

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5c1a3012c836b7093ce907b9')
    },{
        $set: {
            name: 'M Saif'
        },
        $inc: {
            age: 1
        }
    },{
        returnOrignal: false
    })
})
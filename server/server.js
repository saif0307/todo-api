const express = require('express')
const bodyParser = require('body-parser')
const {ObjectID} = require('mongodb')
const {mongoose} = require('./db/mongoose.js')
const {Todo} =  require('./models/todos.js')
const {User} =  require('./models/user.js')

const app  = express()
const port = process.env.PORT || 3000
  app.use(bodyParser.json())

app.post('/todos' , (req, res) => {
    const todo1 =  new Todo({text: req.body.text})
    todo1.save().then((doc) => {
        res.send(doc)
    }, (err) => {
        res.status(400)
        res.send(err)
    })
})

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.status(200).send({todos})
    }, (err) => {
        res.status(400).send(err)
    })
})

app.get('/todos/:id', (req, res) => {
    const id = req.params.id

    if(!ObjectID.isValid(id)) {
        return res.status(404).send({
            Error: 'Id is invalid'
        })
    }
    Todo.findById(id).then((todo) => {
        if(!todo) {
           return res.status(404).send({})
        }
        res.status(200).send({todo})
    }, (err) => {
        if(err) {
            res.status(400).send({})
        }
    })

})

app.delete('/todos/:id', (req, res) => {
    const id = req.params.id
      if(!ObjectID.isValid(id)) {
        return res.status(404).send({
            Error: 'Id is invalid'
        })
    }
    Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo) {
            return res.status(404).send({})
        }
        res.status(200).send({deleted: todo})
    }, (err) => {
        if(err) {
            res.status(400)
        }
    })
})

app.listen(port, () => {
    console.log(`Server started at port:${port}`)
})

module.exports = {app}
const request = require('supertest');
const expect = require('expect')
const {ObjectID} = require('mongodb')
const {Todo} =  require('./../models/todos.js')
const {app} = require ('./../server')

const todos = [{
    text: "this is a new todo",
    _id: new ObjectID()
    },{
     text: "this is the second todo from test",
     _id: new ObjectID()
    }]

beforeEach((done) => {
    Todo.deleteMany({}).then(() => {
        return Todo.insertMany(todos)
    }).then(() => done())
})

describe('Post/ Todos', () => {
    const text = "This is test request"
it('should create new Todos', (done) => {
    request(app)
    .post('/todos')
    .send({text})
    .expect(200)
    .expect((res) => {
        expect(res.body.text).toBe(text)
    })
    .end((err, res) => {
        if(err){
            return done(err)
        }

        Todo.find({text}).then((res) => {
            expect(res[0].text).toBe(text)
            expect(res.length).toBe(1)
            done()
        }).catch((err) => {
             return done(err)
        })
    })
    
    
    })
it('should not create todos with invalid data', (done) => {
    request(app)
    .post('/todos')
    .send({})
    .expect(400)
    .end((err, res) => {
        if(err) {
            return done(err)
        }
        Todo.find().then((res) => {
            console.log(res)
            expect(res.length).toBe(2)
            done()
        }).catch((err) => {
            done(err)
        })
    })  
})

})

describe('Get /Todos', () => {
    it('should get all the todos', (done) => {
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
            expect(res.body.todos.length).toBe(2)
        }).end((err, res) => {
            if(err) {
                return done(err)
            }
            done()
        })
    })
})

describe('Get/ Todos:id', () => {
    it('should get a todo by its ID', (done)  => {
        request(app)
         .get(`/todos/${todos[0]._id.toHexString()}`)
         .expect(200)
         .expect((res) => {
             expect(res.body.todo.text).toBe(todos[0].text)
         })
         .end((err, res) => {
             if(err) {
                 return done(err)
             }
             done()
         })
    })

    it('it should return 404 if no todo', (done) => {
        request(app)
         .get(`/todos/${new ObjectID().toHexString()}`)
         .expect(404)
         .end((err, res) => {
             if(err) {
                 return done(err)
             }
             done()
         })
    })

    it('should return 404 for invalid id', (done) => {
        request(app)
         .get(`/todos/123`)
         .expect(404)
         .end((err) => {
            if(err) {
                return done(err)
            }
            done()
        })
    })
   
})

describe('DELETE/ tODOS', () => {
    const hexId = todos[1]._id.toHexString()
    it('should delete a todo', (done) => {
        request(app)
         .delete(`/todos/${hexId}`)
         .expect(200)
         .expect((res) => {
             expect(res.body.todo._id).toBe(hexId)
         })
         .end((err, res) => {
             if(err) {
                 return done(err)
             }
             Todo.findById(hexId).then((todo) => {
                 expect(todo).toBeFalsy()
                 done()
             }).catch((err) => {
                 return done(err)
             })
         })
    })

    it('should return 404 if TODO not found', (done) => {
        request(app)
         .delete(`/todos/${new ObjectID().toHexString()}`)
         .expect(404)
         .end(done)
    })

    it('should return 404 if ObjectID is invalid', (done) => {
        request(app)
        .delete(`/todos/123`)
        .expect(404)
        .end(done) 
    })
})
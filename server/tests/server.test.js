const request = require('supertest');
const expect = require('expect')

const {Todo} =  require('./../models/todos.js')
const {app} = require ('./../server')

const todos = [{
    text: "this is a new todo"
    },{
     text: "this is the second todo from test"
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
let env = process.env.NODE_ENV || 'development'
console.log('env************',env)
if(env === 'development') {
process.env.PORT = 3000
process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp'
} else if(env === 'test') {
    process.env.PORT = 3000
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApptest'
}else if(env === 'production') {
    process.env.MONGODB_URI = 'mongodb://saifimran1:Todo-api1@ds143594.mlab.com:43594/todo-api'
}
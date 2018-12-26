const mongoose =  require('mongoose')

mongoose.Promise = global.Promise;
const URI = 'mongodb://saifimran1:Todo-api1@ds143594.mlab.com:43594/todo-api'
const local = 'mongodb://localhost:27017/TodoApp'
mongoose.connect(local || URI, {useNewUrlParser: true})

module.exports = {mongoose}
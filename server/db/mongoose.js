const mongoose =  require('mongoose')

mongoose.Promise = global.Promise;
let URI = ''
if(process.env.PORT){
URI = 'mongodb://saifimran1:Todo-api1@ds143594.mlab.com:43594/todo-api'
}else{
 URI = 'mongodb://localhost:27017/TodoApp'   
}
mongoose.connect(URI, {useNewUrlParser: true})

module.exports = {mongoose}
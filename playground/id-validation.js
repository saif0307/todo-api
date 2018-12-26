const {User} = require('./../server/models/user')
// This line connect the file to the mongoose configuration in server db
const {mongoose} = require('./../server/db/mongoose')
const {ObjectID} = require('mongodb')

const id = '5c1b13d2dc9c2423b4266ad8'
if(!ObjectID.isValid(id)) {
    console.log('id is not valid')
}
User.findById(id).then((res) => {
    console.log(res)
}).catch((err) => {
    console.log('Error:' )
})

// User.findOne({_id : id}).then((res) => {
//     console.log(res)
// })
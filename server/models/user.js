const mongoose =  require('mongoose')
const validator = require('validator')
const jwt =  require('jsonwebtoken')
const _ = require('lodash')

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
})

UserSchema.methods.toJSON = function() {
    const user = this
    const userObj = user.toObject()
    return  _.pick(userObj, ["email", "_id"])
}

UserSchema.statics.findByToken = function(token) {
    let decoded;
     try {
        decoded = jwt.verify(token, 'abc123')
     }catch (e) {
        // return new Promise((resolve, reject) => {
        //     reject()
        // })
        return Promise.reject()   // same as the above commented code
     }
    return this.findOne({
         _id: decoded._id,
         'tokens.token': token,
         'tokens.access': 'auth'
     })
}

UserSchema.methods.generateAuthToken = function() {
    const user = this
    const access = 'auth'
    
    const token = jwt.sign({_id: user._id, access}, 'abc123').toString()
    user.tokens.push({access, token})

    return user.save().then(() => { // one return is to get the value of this func in server.js
        return token               // we can the tack on a then call and grab the value of token
    })
}

const User = mongoose.model('User', UserSchema)

module.exports = {User}
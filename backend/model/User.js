const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    gid:{
        type:String,
        required:true

    },
   
    name:{
        type:String,
        required:true

    },
    photo:{
        type:String,
        required:true

    }
})

module.exports =mongoose.model('User',userSchema)
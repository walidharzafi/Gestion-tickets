const mongoose = require('mongoose')
const Schema = mongoose.Schema

const departmentSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    administrator : {
        type : String,
        required : true,
        min : 4  
    },
    created_at :{
        type : Date, 
        default: new Date().toLocaleDateString()
    }
})

module.exports = mongoose.model('department', departmentSchema)
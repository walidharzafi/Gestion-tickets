const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    first_name : {
        type : String,
        required : true,
        min : 4
    },
    last_name : {
        type : String,
        required : true,
        min : 4
    },
    email : {
        type : String,
        required : true,
        min : 6
    },
    password : {
        type : String,
        required : true,
        min : 6
    },
    role : {
        type : String,
        enum : ["user", "admin", "technician"],
        default : "user"
    },
    active : {
        type : Boolean,
        default : false
    },
    departement_id: {
        type : Schema.Types.ObjectId,
        ref : 'department',
        required:true,
    },
    created_at : {
        type : Date, 
        default: new Date().toLocaleDateString()
    },
})

module.exports = mongoose.model('User', userSchema)
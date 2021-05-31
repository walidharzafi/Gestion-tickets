const mongoose = require('mongoose')
const Schema = mongoose.Schema

const assignSchema = new Schema({
    technician_Id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    ticket_Id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Ticket',
        required : true
    },
    created_at : {
        type : Date, 
        default: new Date().toLocaleDateString()
    }
})

module.exports = mongoose.model('Assign', assignSchema)
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ticketSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    ticket_type : {
        type : String,
        required : true
    },
    urgent : {
        type : String,
        enum : ["Normal", "Moyen", "Urgent"],
        default : "Normal"

    },
    description : {
        type : String,
        required : true
    },
    etat : {
        type : String,
        enum : ["Affecte", "Non_Affecte", "Reaffecte", "Cloture"],
        default : "Non_Affecte"
    },
    created_at : {
        type : Date, 
        default: new Date().toLocaleDateString()
    },
    user_Id :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }
})

module.exports = mongoose.model('Ticket', ticketSchema)
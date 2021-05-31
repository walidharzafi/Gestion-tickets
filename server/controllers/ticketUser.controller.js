const Ticket = require('../models/Ticket.model')
const jwt = require('jsonwebtoken')


exports.createTicket = async (req, res) => {
    try {
        const token = req.cookies.jwt_token
        let id_User;
        if(token){
            jwt.verify(token, process.env.SECRET_TOKEN, (err, decodedToken) => {
                id_User = decodedToken.id
                return id_User
        })}
        const {title, ticket_type, urgent, description, etat  } = req.body
    
        const ticket = new Ticket({
            title, 
            ticket_type, 
            urgent, 
            description,
            etat , 
            user_Id : id_User
        })
        const saveTicket = await ticket.save()
        res.status(200).json({message:"Ticket has been created",  saveTicket})
    } catch (error) {
        res.status(500).json(error)
    }


}

exports.allTicketUser = async (req, res) => {
    try {
        const token = req.cookies.jwt_token
        let id_User;
        if(token){
            jwt.verify(token, process.env.SECRET_TOKEN, (err, decodedToken) => {
                id_User = decodedToken.id
                return id_User
        })}
        const allTicketUser = await Ticket.find({user_Id : id_User}) 
        res.status(201).json(allTicketUser)
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.deleteTicket = async (req, res) => {
    try {
        const deleteTicket = await Ticket.findByIdAndRemove(req.params.id)
        res.status(200).json({message : 'Ticket deleted successfully !'})
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.getAllTicket = async (req, res) => {
    try {
        // const allTicket = await Ticket.find( { $or: [ { 'etat': 'Affecte' }, { 'etat': 'Non_Affecte' },{ 'etat': 'Reaffecte' } ] } ).sort({created_at: -1})
        const allTicket = await Ticket.find( ).sort({created_at: -1})
        res.status(200).json(allTicket)
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.infosTicket = async (req, res) => {
    const {id} = req.params
   
    try {
        const infoTicket = await Ticket.findById({_id : id })
        // console.log(infoTicket)
        res.status(201).json(infoTicket)
    } catch (error) {
        res.status(500).json(error)
    }
}

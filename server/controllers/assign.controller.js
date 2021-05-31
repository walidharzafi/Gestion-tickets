const Assign = require('../models/Assign.model')
const Ticket = require('../models/Ticket.model')
const jwt = require('jsonwebtoken')


exports.assignTicket = async (req, res) => {
    try {
        const { technician } = req.body
        const { id } = req.params
        const idticket = await Ticket.findOne({_id : id})
        const assignedTicket = new Assign({
            technician_Id : technician,
            ticket_Id : idticket._id
        })
        const etatTicket = await Ticket.findByIdAndUpdate({_id : id}, {etat : 'Affecte'}) 
        console.log("save",assignedTicket)
        const assignSave = await assignedTicket.save()
        res.status(201).json({message : "The Ticket Assigned", assignSave}) 
    } catch (error) {
        res.status(500).json(500)
    }
}


exports.getTicketTechnician = async (req, res) => {
    try {
        const token = req.cookies.jwt_token
        let id_User;
        if(token){
            jwt.verify(token, process.env.SECRET_TOKEN, (err, decodedToken) => {
                id_User = decodedToken.id
                return id_User
        })}
    const ticketTichnician = await Assign.find({technician_Id : id_User}).populate('ticket_Id', 'title ticket_type urgent etat description _id')
        // console.log(ticketTichnician)
        res.status(201).json(ticketTichnician)
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.refuseTicket = async (req, res) => {
    try {
        const refuse = await Ticket.findByIdAndUpdate({_id : req.params.id}, {etat : 'Reaffecte'})
        res.status(200).json({message : 'Ticket refuse !'})
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.acceptTicket = async (req, res) => {
    try {
        const accept = await Ticket.findByIdAndUpdate({_id : req.params.id}, {etat : 'Cloture'})
        res.status(200).json({message : 'Ticket accepted !'})
    } catch (error) {
        res.status(500).json(error)
    }
}
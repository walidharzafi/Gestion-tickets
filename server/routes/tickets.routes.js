const express = require('express')
const routeTicket = express.Router()
const { createTicket, allTicketUser, getAllTicket, infosTicket, deleteTicket } = require('../controllers/ticketUser.controller')

// add ticket
routeTicket.post('/add', createTicket)

// get all ticket of user
routeTicket.get('/allTicket', allTicketUser )

// get all ticket of all users
routeTicket.get('/allTicketUser', getAllTicket)

routeTicket.get('/infoTicket/:id', infosTicket)

routeTicket.delete('/deleteTicket/:id', deleteTicket)

module.exports = routeTicket
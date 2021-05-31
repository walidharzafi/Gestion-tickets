const express = require('express')
const routeAssign = express.Router()
const { assignTicket, getTicketTechnician, refuseTicket, acceptTicket } = require('../controllers/assign.controller')

// assign a ticket to a technician
routeAssign.post('/assigned/:id', assignTicket)

// get the ticket assigned to technician
routeAssign.get('/ticketTichnician', getTicketTechnician)

// refuse ticket
routeAssign.put('/refuse/:id', refuseTicket)

routeAssign.put('/accept/:id', acceptTicket)


module.exports = routeAssign
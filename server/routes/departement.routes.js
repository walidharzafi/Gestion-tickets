const express = require('express')
const routeDepartment = express.Router()
const { addDepartment, getAllDepartment } = require('../controllers/department.controller')

// add departement
routeDepartment.post('/add', addDepartment)

// get all department 
routeDepartment.get('/allDepartment', getAllDepartment)

module.exports = routeDepartment
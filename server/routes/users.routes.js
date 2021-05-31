const express = require('express')
const routeUser = express.Router()
const { signUpUser, signInUser, getallUser, logout, allTechnician, activateAccount } = require('../controllers/authUser')
const { isAdmin, isTechnician, isUser, isAuth } = require('../middleware/auth.middleware')

//register user 
routeUser.post('/signUp', signUpUser)

//login User 
routeUser.post('/signIn', signInUser)

// admin 
routeUser.get('/allUser', getallUser)

// get all technician 
routeUser.get('/technician', allTechnician)

// lougout 
routeUser.get('/logout', logout)

// activate account 
routeUser.put('/activate/:id', activateAccount)


module.exports = routeUser;
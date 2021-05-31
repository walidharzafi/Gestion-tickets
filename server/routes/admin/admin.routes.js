const express = require('express')
const routeUser = express.Router()
const { signUpUser, signInUser } = require('../../controllers/admin/authAdmin')
// const { isAuth } = require('../middleware/auth.middleware')

//register user 
routeUser.post('/signUp', signUpUser)

//login User 
routeUser.post('/signIn', signInUser)


module.exports = routeUser;
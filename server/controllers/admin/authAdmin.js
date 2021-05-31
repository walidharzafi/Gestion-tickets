const User = require('../../models/User')
const bcrypt = require('bcrypt')
const { signUpValidation, signInValidation} = require('../../validation/validation')
const jwt = require('jsonwebtoken')

const maxAge = 2 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({id}, process.env.SECRET_TOKEN, {
        expiresIn : maxAge
    })
}
exports.signUpUser = async (req, res) => {
    // res.json({message : "it's work "})
    //validation 
    const {error} = signUpValidation(req.body)
    if(error) {
        return res.status(400).send(error.details[0].message)
    }
    //check the email if exist
    const checkUser = await User.findOne({email : req.body.email})
    if(checkUser) {
        return res.status(400).json({message : 'Email Alredy exist'})
    }
    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashPw = await bcrypt.hash(req.body.password , salt)
    //save use
    const user = new User({
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        email : req.body.email,
        password : hashPw,
        role : "admin"
    })
    try {
        const saveUser = await user.save()
        const token = createToken(saveUser._id, saveUser.role)
        const cook = res.cookie('jwt_token', token, { httpOnly: true, maxAge: maxAge* 1000 })
        // console.log(cook)
        res.status(201).json('You Are Registered Successfully')
    } catch (error) {
        res.status(400).json(error)
    }
};

exports.signInUser = async (req, res) => {
    // generate error
    const {error} = signInValidation(req.body) 
    if(error) {
        return res.status(400).json(error.details[0].message)
    }

    try {
        // check the email if exist or not 
    const existUser = await User.findOne({email : req.body.email})
    if(!existUser){
        return res.status(400).json('This Email Are not Exist')
    }
    // compare password
    const comparePw = await bcrypt.compare(req.body.password, existUser.password)
    if(!comparePw) {
        return res.status(400).json('The Password are not Valid')
    }
    // res.status(200).json( "Loged In")

    const token = createToken(existUser._id, existUser.role)
    return res.status(200).cookie('jwt_token', token, { httpOnly: true, maxAge: maxAge* 1000 }).json( "Loged In")

    
    } catch (error) {
        res.status(400).json(error)
    }
    
}
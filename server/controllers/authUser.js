const User = require('../models/User.model')
const bcrypt = require('bcrypt')
const { signUpValidation, signInValidation} = require('../validation/validation')
const jwt = require('jsonwebtoken')

const maxAge = 2 * 24 * 60 * 60;
const createToken = (id, role) => {
    return jwt.sign({ id, role}, process.env.SECRET_TOKEN, {
        expiresIn : maxAge
    })
}
exports.signUpUser = async (req, res) => {
    try { 
        const {error} = signUpValidation(req.body)
        if(error) {
            return res.status(400).send(error.details[0].message)
        }

        const { first_name, last_name, email, password, role, departement_id} = req.body

        //check the email if exist
        const checkUser = await User.findOne({email : email})
        if(checkUser) {
            return res.status(400).json({message : 'Email Alredy exist'})
        }
        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashPw = await bcrypt.hash(password , salt)
        //save user
        const user = new User({
            first_name,
            last_name ,
            email,
            password : hashPw,
            role,
            departement_id  
        })
        const saveUser = await user.save()
        // console.log(saveUser)
        // const token = createToken(saveUser._id, saveUser.role)
        // res.status(200).cookie('jwt_token', token, { httpOnly: true, maxAge: maxAge* 1000 }).json({message: 'You Are Registered Successfully', isAuth:true, role:saveUser.role})
        res.status(200).json({message: 'You Are Registered Successfully, you need to activate your compte'})

    } catch (error) {
        res.status(500).json(error)
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
        // check the compte of user
        if(existUser.active === false){
            return res.status(400).json('You must activate your account')
        }

        // res.status(200).json( "Loged In")

        const token = createToken(existUser._id, existUser.role)
        return res.status(200).cookie('jwt_token', token, { httpOnly: true, maxAge: maxAge* 1000 }).json({message: 'Loged In', isAuth:true, role:existUser.role})

    
    } catch (error) {
        res.status(500).json(error)
    }
    
}

exports.getallUser = async (req, res) => {
    try {
       const allUser = await User.find().populate('departement_id', 'name -_id')
       res.status(200).json(allUser) 
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.allTechnician = async (req, res) => {
    try {
        const allTechnician = await User.find({role : 'technician'}).select('first_name last_name _id')
        res.status(201).json(allTechnician)
    } catch (error) {
        res.status(500).json(error)
    }
}


exports.logout = (req, res) => {
    return res.status(200).clearCookie('jwt_token').json({isAuth:false,role:''})
    // return res.redirect('/')
}

// activate the account of users
exports.activateAccount =async (req, res) => {
    try {
        const activate = await User.findByIdAndUpdate({_id : req.params.id}, {active: 'true'})
        res.status(200).json({message : 'This Account Has Been Activated Successfully !'})
    } catch (error) {
        res.status(500).json(error)
    }
}


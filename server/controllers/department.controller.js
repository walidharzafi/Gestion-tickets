const Department = require('../models/Department.model')



exports.addDepartment = async (req, res) => {
    try {
        const checkDepartment = await Department.findOne({name : req.body.name})
        if(checkDepartment) return res.status(400).json({message: "this department has alredy exist"})

        const department = new Department({
            ...req.body
        })
        const saveDepartment = await department.save()

        res.status(201).json({depa: saveDepartment, message : "The Department Is Registered" })

    } catch (error) {
        res.status(500).json(error)
    }

}

exports.getAllDepartment = async (req, res) => {
    try {
        const allDepartment = await Department.find()
        res.status(200).json(allDepartment)
    } catch (error) {
        res.status(500).json(error)
    }
}
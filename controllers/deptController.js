const Department = require('../models/deptModel');

// get the department complete data as it is in db

const department = async (req, res) => {
    try {

        // const departmentData = req.department;
        const departmentData = await Department.find();
        // console.log(departmentData);
        res
        .status(200)
        .json({departmentData} 
        );

    } catch (error) {
        res.status(400).send({ message: `error from the department route controller ${error}` })
    }
};


module.exports = {department };
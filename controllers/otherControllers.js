const Department = require('../models/deptModel');
const Scheme = require('../models/schemeModel');
const Batch = require('../models/batchModel');

// *--------------------------------
// * Logic for adding New Department
// *---------------------------------



// Route for student registration
const addDept = async (req, res) => {
    try {
        // Extract departmentId, semesterId, and batchId from request body
        const { deptName, deptId } = req.body;


        // Check if customer with the same usn already exists
        const departmentExist = await Department.findOne({ deptId });

        if (departmentExist) {
            return res.status(400).json({ message: "Ye department already hai !" });
        }



        // Create a new student document
        const newDepartment = new Department({
            deptName,
            deptId

        });


        // Save the new customer object to the database
        const savedDepartment = await Department.create(newDepartment);
        // Save the student document to the database

        res.status(201).send('Department Added successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

// *--------------------------------
// * Logic for adding New Department
// *---------------------------------



// Route for student registration
const addSem = async (req, res) => {
    try {
        // Extract departmentId, semesterId, and batchId from request body
        const { batch } = req.body;


        // Check if customer with the same usn already exists
        const schemeExist = await Scheme.findOne({ batch });

        if (schemeExist) {
            return res.status(400).json({ message: "Ye scheme already hai !" });
        }



        // Create a new student document
        const newScheme = new Batch({
            batch

        });


        // Save the new customer object to the database
        const savedSem = await Batch.create(newScheme);
        // Save the student document to the database

        res.status(201).send('Semester Added successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};


module.exports = { addDept, addSem };


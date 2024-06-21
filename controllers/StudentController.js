const Student = require('../models/studentsModel');
const Department = require('../models/deptModel');
const Scheme = require('../models/schemeModel');
const Semester = require('../models/semModel');
const Batch = require('../models/batchModel');





// get the student complete data as it is in db

const student = async (req, res) => {
    try {

        const studentData = req.student;

        // console.log(studentData);
        res
            .status(200)
            .json({ studentData }
            );

    } catch (error) {
        res.status(400).send({ message: `error from the user route ${error}` })
    }
};


// *--------------------------------
// * Function to get all students
// *--------------------------------
const getAllStudents = async (req, res) => {
    try {
        // Retrieve all students from the database
        const students = await Student.find()
            .populate('department')
            .populate('scheme')
            .populate('semester')
            .populate('batch')
            .exec();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
    }
};



// *--------------------------------
// * Logic for adding New Student
// *---------------------------------



// Route for student registration
const register = async (req, res, next) => {
    try {
        // Extract departmentId, semesterId, and batchId from request body
        const { name, dob, gender, usn, password, email, contact, department, semester, batch, scheme } = req.body;
        // Get the current date and time
        const currentDate = new Date();

        // console.log("Request Body:", req.body);

        // Find the department, semester, and scheme documents based on their names
        const checkDepartment = await Department.findOne({ deptId: department });

        const checkSemester = await Semester.findOne({ semNum: semester });

        const checkBatch = await Batch.findOne({ batch: batch });

        const checkScheme = await Scheme.findOne({ scheme: scheme });


        // Check if any of the referenced documents are not found
        if (!department || !semester || !scheme) {
            return res.status(400).json({ message: "Department, Semester, or Scheme not found" });
        }



        // Check if customer with the same usn already exists
        const studentExist = await Student.findOne({ usn });

        if (studentExist) {
            return res.status(400).json({ message: "You are already Registered !" });
        }



        // Create a new student document
        const newStudent = new Student({
            name,
            dob,
            password,
            gender,
            usn,
            email,
            contact,
            regesteredAt: currentDate,
            department: checkDepartment._id,
            semester: checkSemester._id,
            batch: checkBatch._id,
            scheme: checkScheme._id,
        });


        // Save the new customer object to the database
        const savedStudent = await Student.create(newStudent);
        // Save the student document to the database

        res.status(201).json({ message: "Registration Successfull" });
    } catch (error) {
        // console.error(error);
        // res.status(500).send('Internal Server Error');
        next(error);
    }
};



// *--------------------------
// * Logic for Student Login
// *--------------------------

// Function to handle user login
const studentLogin = async (req, res) => {
    try {
        const { usn, password } = req.body;
        const student = await Student.findOne({ usn });

        if (!student || student.password !== password) {
            return res.status(401).json({ message: 'Invalid USN or password.' });
        }

        if (student) {

            res.status(200).json({
                msg: "Login Successful",
                token: await student.generateToken(),
                userId: student.usn
            });


        } else {
            res.status(401).json({ message: "Login page ke controller logic me error hai " })
        }


        // const token = jwt.sign({ userId: user.c_id }, process.env.JWT_SECRET);
        // res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
    }
};




module.exports = { student, register, studentLogin, getAllStudents };




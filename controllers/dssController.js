const Department = require('../models/deptModel');
const Scheme = require('../models/schemeModel');
const Semester = require('../models/semModel');

// get the department complete data as it is in db

const dss = async (req, res) => {
    try {

        // const departmentData = req.department;
        const departmentData = await Department.find();
        const schemeData = await Scheme.find();
        const semesterData = await Semester.find();

        const dssData = {
            departments: departmentData,
            schemes: schemeData,
            semesters: semesterData
        };

        // console.log(departmentData);
        res.status(200).json({dssData});

    } catch (error) {
        res.status(400).send({ message: `error from the dss route controller ${error}` })
    }
};


module.exports = {dss };
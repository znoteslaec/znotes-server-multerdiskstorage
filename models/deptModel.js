const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    deptName: {
        type: String,
        required: true
    },
    deptId: {
        type: String,
        required: true
    }
});

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;




const mongoose = require('mongoose');

const semesterSchema = new mongoose.Schema({
    semNum: {
        type: Number,
        required: true
    }
});

const Semester = mongoose.model('Semester', semesterSchema);

module.exports = Semester;



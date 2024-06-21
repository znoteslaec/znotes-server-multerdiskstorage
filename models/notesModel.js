const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    departmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    },
    semesterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Semester',
        required: true
    },
    batchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Batch',
        required: true
    },
    author: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;



// sample json
// {
//     "title": "Sample Note",
//     "content": "This is a sample note content.",
//     "departmentId": "6152e3db6f3659348ca8a95b", // Department ObjectId
//     "semesterId": "6152e3db6f3659348ca8a95c",   // Semester ObjectId
//     "batchId": "6152e3db6f3659348ca8a95d",      // Batch ObjectId
//     "author": "John Doe"
// }


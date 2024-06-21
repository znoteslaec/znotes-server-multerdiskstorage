const mongoose = require('mongoose');

const PdfSchema = new mongoose.Schema({
    subjectCode: { 
        type: String
    },
    subjectAbb: { 
        type: String
    },

    pdfTitle: {
        type: String,
        
    },
    pdfDescription: {
        type: String,
    },
    pdfFile: {
        type: String,
        required: true
    },
    addedBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Student' 
    },
    addedByName:{
        type: String
    },
    addedAt: { 
        type: Date, 
        default: Date.now 
    },
});

const SectionSchema = new mongoose.Schema({
    subject: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Subject' 
    },
    sectionName: {
        type: String,
        required: true
    },
    sectionDesc: {
        type: String,
    },
    addedBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Student' 
    },
    addedByName:{
        type: String
    },
    addedAt: { 
        type: Date, 
        default: Date.now 
    },
    pdfs: [PdfSchema] // Array of PDFs
});


const Section = mongoose.model('Section', SectionSchema);

module.exports = Section;

const Section = require('../../models/sectionModel');
const Subject = require('../../models/subjectModel');
const fs = require('fs');
const path = require('path');



// Controller function to add PDF to a section
const addPdfToSection = async (req, res, next) => {

  const { sectionId } = req.params;
  const { subCode, pdfTitle, pdfDescription, addedBy, addedByName } = req.body;
  const pdfFile = req.file.filename;

  try {

    // Get the current date and time
    const currentDate = new Date();

    // Find the subject by subCode
    const checkSubject = await Subject.findOne({ subCode });

    if (!checkSubject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    const section = await Section.findById(sectionId);
    if (!section) {
      return res.status(404).json({ message: 'Section not found' });
    }


    const newPdf = {
      pdfTitle,
      pdfDescription,

      pdfFile,
      subjectAbb: checkSubject.subAbb,
      subjectCode: checkSubject.subCode,
      addedBy,
      addedByName,
      addedAt: currentDate
    };

    section.pdfs.push(newPdf);
    await section.save();

    // res.status(200).json(newPdf);
    res.status(200).json({ message: "PDF Added Successfully", pdf: newPdf });
  } catch (error) {
    // console.error('Error adding PDF:', error);
    // res.status(500).json({ error: 'Internal Server Error' });
    next(error);
  }
};





// Controller function to get PDFs of a section
const getPdfsOfSection = async (req, res) => {
  const { subCode, sectionId } = req.params;

  try {
    // Find the subject based on the subject code
    const existingSubject = await Subject.findOne({ subCode });
    if (!existingSubject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    // Find the section in the subject
    const section = existingSubject.sections.find(section => section._id.toString() === sectionId);
    if (!section) {
      return res.status(404).json({ message: 'Section not found' });
    }

    // Return the PDFs of the section
    res.status(200).json({ pdfs: section.pdfs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error (Problem in Controller)' });
  }
};


// Controller function to delete a PDF from a section
const deletePdfFromSection = async (req, res, next) => {
  const { pdfId, sectionId } = req.body;
  try {
    if (!pdfId || !sectionId) {
      return res.status(400).json({ error: 'PDF ID and Section ID are required' });
    }

    const section = await Section.findById(sectionId);
    if (!section) {
      return res.status(404).json({ error: 'Section not found' });
    }

    const pdfIndex = section.pdfs.findIndex(pdf => pdf._id.toString() === pdfId);
    if (pdfIndex === -1) {
      return res.status(404).json({ error: 'PDF not found' });
    }

    const filePath = path.join(__dirname, '..', '..', 'uploads', section.pdfs[pdfIndex].pdfFile);
    fs.unlinkSync(filePath);

    section.pdfs.splice(pdfIndex, 1);
    await section.save();

    res.status(200).json({ message: 'PDF deleted successfully' });
  } catch (error) {
    console.error('Error deleting PDF:', error);
    res.status(500).json({ error: 'Internal Server Error' });
    next(error);
  }
};

module.exports = { addPdfToSection, getPdfsOfSection, deletePdfFromSection };

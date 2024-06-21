const Subject = require('../models/subjectModel');
const Department = require('../models/deptModel');
const Scheme = require('../models/schemeModel');
const Semester = require('../models/semModel');
const Section = require('../models/sectionModel');
const fs = require('fs');
const path = require('path');

// Controller function to add a new subject
const addSubject = async (req, res, next) => {
  const { subCode, subAbb, subName, department, semester, scheme, addedBy, addedByName } = req.body;

  try {

    // Get the current date and time
    const currentDate = new Date();
    // Find the department, semester, and scheme documents based on their names
    const checkDepartment = await Department.findOne({ deptId: department });
    const checkSemester = await Semester.findOne({ semName: semester });
    const checkScheme = await Scheme.findOne({ scheme: scheme });



    // Check if the subject already exists
    // const existingSubject = await Subject.findOne({ subCode });
    // Check if the subject already exists for the given department, semester, and scheme
    const existingSubject = await Subject.findOne({
      
      subCode,
      department: checkDepartment._id,
      semester: checkSemester._id,
      scheme: checkScheme._id
    });
    if (existingSubject) {
      return res.status(400).json({ message: "Subject Already Exists!" });
    }


    // Create a new subject
    const newSubject = new Subject({
      subCode,
      subAbb,
      subName, addedBy, addedByName,
      department: checkDepartment._id,
      semester: checkSemester._id,
      scheme: checkScheme._id,
      addedAt: currentDate,
    });

    // Save the subject to the database
    await newSubject.save();

    res.status(201).json({ message: 'Subject added successfully', subject: newSubject });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
    next(error);
  }
};

// Controller function to fetch subjects based on department, semester, and scheme
const getSub = async (req, res, next) => {
  const { department, semester, scheme } = req.body;

  try {
    const checkDepartment = await Department.findOne({ deptId: department });
    const checkSemester = await Semester.findOne({ semName: semester });
    const checkScheme = await Scheme.findOne({ scheme });

    if (!checkDepartment || !checkSemester || !checkScheme) {
      return res.status(404).json({ message: 'Department, semester, or scheme not found' });
    }

    const subjects = await Subject.find({
      department: checkDepartment._id,
      semester: checkSemester._id,
      scheme: checkScheme._id
    });

    res.status(200).json({ subjects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
    next(error);
  }
};


// Controller function to get subject details by subCode
const getSubjectDetails = async (req, res) => {
  const subCode = req.params.subCode;

  try {
    const subjectDetails = await Subject.findOne({ subCode })
      .populate('department')
      .populate('semester')
      .populate('scheme')
      .populate('sections');

    if (subjectDetails) {
      res.json(subjectDetails);

      // // the below line is to view the data or response coming 
      // res.send({subjectDetails});
    } else {
      res.status(404).send('Subject not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};





// Controller function to edit subject details
const editSubject = async (req, res, next) => {
  const { subCode } = req.params;
  //   const { subAbb, subName, department, semester, scheme } = req.body;
  const { subCode: newSubCode, subAbb, subName, department, semester, scheme } = req.body;
  try {
    // Find the subject by subCode
    const subject = await Subject.findOne({ subCode });

    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    // Find the department, semester, and scheme documents based on their names
    const checkDepartment = await Department.findOne({ deptId: department });
    const checkSemester = await Semester.findOne({ semName: semester });
    const checkScheme = await Scheme.findOne({ scheme });


    // If the subCode is being changed, validate if the new subCode already exists in the same department, scheme, and semester
    if (newSubCode !== subCode) {
      const existingSubject = await Subject.findOne({
        subCode: newSubCode,
         department: checkDepartment._id,
        semester: checkSemester._id,
        scheme: checkScheme._id
      });
      if (existingSubject) {
        return res.status(400).json({message: `A subject already exists with the code ${newSubCode}`});
      }
    }

    // Update subject details
    subject.subCode = newSubCode || subject.subCode;
    subject.subAbb = subAbb;
    subject.subName = subName;
    subject.department = checkDepartment._id;
    subject.semester = checkSemester._id;
    subject.scheme = checkScheme._id;

    // Save the updated subject
    await subject.save();

    res.status(200).json({ message: 'Subject updated successfully', subject });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
    next(error);
  }
};




const deleteSubject = async (req, res, next) => {
  const { subCode } = req.params;

  try {
    // Find the subject by subCode
    const subject = await Subject.findOne({ subCode }).populate('sections');

    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    // Delete associated PDFs for each section
    for (const section of subject.sections) {
      for (const pdf of section.pdfs) {
        const filePath = path.join(__dirname,'..', 'uploads', pdf.pdfFile);
        fs.unlinkSync(filePath);
      }
    }

    // Delete associated sections
    await Section.deleteMany({ _id: { $in: subject.sections } });

    // Delete the subject
    const deletedSubject = await Subject.findOneAndDelete({ subCode });

    res.status(200).json({ message: 'Subject and associated sections deleted successfully', deletedSubject });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
    next(error);
  }
};







module.exports = { getSub, addSubject, getSubjectDetails, editSubject, deleteSubject };

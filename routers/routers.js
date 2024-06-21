const express = require('express');
const router = express.Router();
const studentController = require("../controllers/StudentController");
const notesController = require("../controllers/notesController");
const userController = require("../controllers/usersController");
const otherController = require("../controllers/otherControllers");
const authMiddleware= require("../middlewares/authMiddleware");
const subjectController = require('../controllers/subjectController');
const deptController = require('../controllers/deptController');
const dssController = require('../controllers/dssController');
const sectionController = require('../controllers/subjectPageControllers/sectionController');
const pdfController =require('../controllers/subjectPageControllers/pdfController');
const upload = require("../utils/multerMiddleware");
const studentSchema = require('../validators/authValidator');
const validate = require('../middlewares/validateMiddleware');





// *--------------------------
// * Student Related Routes
// *--------------------------

// signup
router.route("/register").post(validate(studentSchema),studentController.register);

// Login
router.route("/login").post(studentController.studentLogin);

// get
router.route("/student").get(authMiddleware, studentController.student);

// student list
router.route("/getAllStudents").get(studentController.getAllStudents);




// *--------------------------
// * Subject Related Routes
// *--------------------------

// Route to add a new subject
router.route("/addSub").post(subjectController.addSubject);

// Route to fetch subjects based on department, semester, and scheme
router.route("/getSub").post(subjectController.getSub);

// Route to get subject details by subCode
router.route("/getSubjectDetails/:subCode").get(subjectController.getSubjectDetails);

// Route to edit subject details
router.put("/editSubject/:subCode", subjectController.editSubject);

// Route to delete a subject
router.delete("/deleteSubject/:subCode", subjectController.deleteSubject);






// *--------------------------
// * Section Related Routes
// *--------------------------

// Route to add sections to a subject
router.post('/addSectionsToSubject', sectionController.addSectionsToSubject);

// Route to update a section within a subject
router.put('/updateSection/:subCode/:sectionId', sectionController.updateSectionInSubject);

// Route to delete a section from a subject
router.delete('/deleteSection/:subCode/:sectionIndex', sectionController.deleteSectionFromSubject);

// Route to get sections of a subject
//router.get('/sections/:subCode', sectionController.getSubjectSections);



// *--------------------------
// * PDF Related Routes
// *--------------------------

router.route("/addPdfToSection/:sectionId/addPdf").post(upload.single("pdfFile"),pdfController.addPdfToSection);
//router.post('/:sectionId/addPdf', sectionController.addPdfToSection)

// Route to delete a PDF from a section
router.delete('/deletePdfFromSection', pdfController.deletePdfFromSection);


// Route to get PDFs of a section
//router.get('/pdfs/:subCode/sections/:sectionId', pdfController.getPdfsOfSection);






router.route("/").get(notesController.home);

// route for creating
router.route("/createNote").post(notesController.createNote);

// this route is for creating users
// post
router.route("/adduser").post(userController.adduser);

// route for adding the department
router.route("/addDept").post(otherController.addDept);

// route for adding the Semester
router.route("/addSem").post(otherController.addSem);

// get
router.route("/department").get(deptController.department);

// get
router.route("/dss").get(dssController.dss);


module.exports = router;



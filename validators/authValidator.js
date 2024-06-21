const { z } = require("zod");
const Student = require('../models/studentsModel');

const studentSchema = z.object({
    name: z
        .string({ required_error: "Name is required" })
        .trim()
        .min(3, { message: "Name must be atleast of 3 chars." })
        .max(255, { message: "Name must not be more than 255 chars" }),

    usn: z
        .string({ required_error: "USN is required " })
        .trim()
        .min(10, { message: " USN must be 10 chars." })
        .max(10, { message: "USN must not be more than 10 chars." }),


    email: z
        .string({ required_error: "Email is required " })
        .trim()
        .min(12, { message: "Email must be atleast of 12 chars." })
        .max(50, { message: "Email must not be more than 50 chars." }),

    contact: z
        .string({ required_error: "Mobile Number is required" })
        .trim()
        .min(10, { message: "Mobile Number must be atleast of 10 chars." })
        .max(25, { message: "Mobile Number must not be more than 25 chars" }),

    password: z
        .string({ required_error: "Password is required" })
        .trim()
        .min(8, { message: "Password must be atleast of 8 chars." })
        .max(16, { message: "Password must not be more than 16 chars." }),

    gender: z
        .enum(Student.schema.path('gender').enumValues),

    dob: z
        .string({ required_error: "Date of birth is required" }),

    department: z
        .string({ required_error: "Department is required" }),

    semester: z
        .string({ required_error: "Semester By is required" }),

    scheme: z
        .string({ required_error: "Scheme is required" }),
        
    batch: z
        .string({ required_error: "Batch is required" }),

});


module.exports = studentSchema;
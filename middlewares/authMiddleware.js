const jwt = require("jsonwebtoken");
const Student = require("../models/studentsModel");




const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res
            .status(401)
            .json({ message: "Unauthorized HTTP, Token not provided or malformed" });
    }

    // console.log("Token from auth middleware with bearer :",token);

    const jwtToken = token.replace("Bearer ", "").trim();

    // console.log("Token from auth middleware:",jwtToken);

    try {
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
       

        const studentData = await Student.findOne({ usn: isVerified.userID })
        .populate('semester')
        .populate('department')
        .populate('scheme')
        .populate('batch')
        .select({
            password:0,
        });
        // console.log("Student data from database:", studentData);

        if (!studentData) {
            return res
                .status(401)
                .json({ message: "Unauthorized. User not found." });
        }

        req.student = studentData;
        req.token = token;
        req.userId = studentData.c_id;

        next();
    } catch (error) {
        console.error("Error in authMiddleware:", error);
        return res
            .status(401)
            .json({ message: "Unauthorized. Invalid Token." });
    }
};

module.exports = authMiddleware;




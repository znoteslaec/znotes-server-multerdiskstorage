const User = require('../models/userModel');





// *--------------------------------
// * Logic for adding New User
// *---------------------------------

// Code for creating user in the database user folder or collection

const adduser = async (req, res) => {
    try {
        // Extract user data from request body
        const { name, email, password, role, isAdmin } = req.body;



        // Create a new user object using the User model
        const newUser = new User({
          name,
          email,
          password,
          role,
          isAdmin 
        });

        // Save the new user object to the database
        const savedUser = await User.create(newUser);


       res.status(201).json(savedUser);

       //adding user with token
        // res.status(201).json({ msg: "user Added Successfully", token: await savedUser.generateToken(), userId: savedUser.c_id }); 


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server unable to create user Error' });
    }
};








module.exports = { adduser };
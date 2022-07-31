const express = require('express');
const router = express.Router();
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const fetchUser = require('../middleware/fetchUser');
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv')
const JWT_secret = process.env.JWT_SECRET;

dotenv.config({ path: __dirname + '/config.env' });

// Route-1 for creating user
router.post('/createUser', async (req, res) => {

    let success = false;

    try {
        const { name, email, password } = req.body

        // if any empty property remains
        if (!name || !email || !password) {
            return res.status(404).json({success, error: "please filled the credentials" });
        }
        // checking whether user exist
        const userExist = await User.findOne({ email: email })
        if (userExist) return res.status(422).json({success, error: "User Already Exist" })

        // if not exist then creating new user
        const user = new User({ name, email: email.toLowerCase(), password })
        // generate salt to hash password
        const salt = await bcrypt.genSalt(10);
        // now we set user password to hashed password
        user.password = await bcrypt.hash(user.password, salt);

        const data = {
            user: {
                id: user._id
            }
        }
        const authtoken = jwt.sign(data, JWT_secret);
        console.log(authtoken);
        await user.save();
        success = true;
        res.status(201).json({ success,message: "User registered successfully" })

    } catch (error) {
        console.log(error);
    }

})


// Route-2  login
router.post('/login',async (req, res) => {
    let success = false;
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(422).json({ error: "Please fill the credentials" });
        }

        const user = await User.findOne({ email: email })
        if (user) {
            // console.log(password + " " + user);
            const validPassword = await bcrypt.compare(password, user.password);
            if (validPassword) {
                const data = {
                    user:{
                        id: user._id
                    }
                }
                const authtoken = jwt.sign(data, JWT_secret);
                success = true;
                res.status(200).json({success, message: "Login Successfully",authtoken})
            } else {
                return res.status(400).json({success, error: "Wrong credentials" })
            }
        } else {
            return res.status(400).json({ error: "Wrong credentials" });
        }

    } catch (error) {
        console.log(error);
    }
})


// Route -3 get login details
router.post('/loggedUser',fetchUser, async (req, res) => {
    try {
        userID = req.user.id;
        const user = await User.findById(userID).select("-password");
        res.send(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server Error");
    }
})

module.exports = router; 
const express = require('express');
const router = express.Router();


const User = require('./../models/User.js');

// Password hashing
const bcrypt = require('bcrypt');

const generateID = () => Math.random().toString(36).substring(2, 10);

//signup
router.post("/signup", async (req, res) => {
    let { password, username } = req.body;
    password = password.trim();
    username = username.trim();

    if (username == "" || password == "") {
        res.json({
            status: "Failed",
            message: "Empty input field(s)"
        })
    }
    else if (password.length < 8) {
        res.json({
            status: "Failed",
            message: "Password too short"
        })
    }
    else {
        User.find({username}).then(result => {
            if(result.length) {
                res.json({
                    status: "Failed",
                    message: "User already exists"
                })
            } else {
                //creating new user
                let id = generateID();
                console.log(id)
                //password hashing
                const saltRounds = 10;
                bcrypt.hash(password, saltRounds). then(hashedPassword => {
                    const newUser = new User({
                        id,
                        username,
                        password: hashedPassword
                    });

                    newUser.save().then(result => {
                        res.json({
                            status: "Success",
                            message: "Signup successful",
                            data: result
                        })
                    })
                    .catch(err => {
                        res.json({
                            status: "Failed",
                            message: "Error while saving the user"
                        })
                    })
                })
                .catch(err => {
                    res.json({
                        status: "Failed",
                        message: "Error while hashing the password"
                    })
                })
            }
        }).catch(err => {
            console.log(err);
            res.json({
                status: "Failed",
                message: "There was an error when creating account. Try again"
            })
        })
    }
});

//login
router.post("/login", (req, res) => {
    let { password, username } = req.body;
    password = password.trim();
    username = username.trim();

    if (username == "" || password == "") {
        res.json({
            status: "Failed",
            message: "Emtpy fields"
        })
    }
    else {
        User.find({username})
        .then(data => {
            if(data) {
                const hashedPassword = data[0].password;
                bcrypt.compare(password, hashedPassword).then(result => {
                    if(result) {
                        res.json({
                            status: "Success",
                            message: "Signin successful",
                            data: data
                        })
                    } else {
                        res.json({
                            status: "Failed",
                            message: "Wrong password"
                        })
                    }
                })
                .catch(err => {
                    res.json({
                        status: "Failed",
                        message: "An error while checking for existing users"
                    })
                })
            }
            
        })
    }
});

module.exports = router;
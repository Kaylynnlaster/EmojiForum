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
        let id = generateID();
        User.find({username}).then(result => {
            if(result.length) {
                res.json({
                    status: "Failed",
                    message: "User already exists"
                })
            } else {
                //creating new user

                //password hashing
                const saltRounds = 10;
                bcrypt.hash(password, saltRounds). then(hashedPassword => {
                    const newUser = new User({
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
    const { username, password } = req.body;
    let result = users.filter(
        (user) => user.username === username && user.password === password
    );
    if (result.length !== 1) {
        return res.json({
            error_message: "Incorrect credentials",
        });
    }
    res.json({
        message: "Login successfully",
        id: result[0].id,
    });
});

module.exports = router;
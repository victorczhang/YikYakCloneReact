const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");
const mongoose = require("mongoose");
const passport = require("passport");

const User = require("../../models/User");

// @access Public

// Get current user info

router.get('/me', passport.authenticate('jwt', { session: false }), 
    (req, res) => {
        // console.log(req.user._id)

        const filter = {
            // _id: mongoose.Types.ObjectId("5e7910edf10e2665bde4024d"),
            // _id: ObjectId("5e7910edf10e2665bde4024d"),
            // _id: req.params.id
            _id: req.user._id 
            // 'upvotedBy': 'test123'
        }

        User.findOne(filter, function (err, user) {
            // let hasVoted = false

            if (err) {
                return res.status(404).json({
                    success: false,
                    error: err,
                    message: 'User not found!',
                    // exists: false,
                })
            }
            else {
                return res.status(200).json({
                    success: true,
                    message: 'User found!',
                    data: user,
                })
            }
        })
    })

module.exports = router;
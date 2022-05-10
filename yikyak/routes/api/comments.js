const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");
const mongoose = require("mongoose");
const passport = require("passport");

// Load Replies model
const Comments = require("../../models/Comments");

// Add new reply

router.post('/new', (req, res) => {
    const body = req.body
    // const user = req.user

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'No text entered!',
        })
    }

    const comment = new Comments(body)
    if (!comment) {
        return res.status(400).json({ success: false, error: err, message: "Missing Body!" })
    }

    comment
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: comment._id,
                post_id: comment.post_id,
                comment: comment.body,
                points: comment.points,
                createdAt: comment.createdAt,
                message: 'Comment created!'
            })
        })
        .catch(e => {
            return res.status(400).json({
                error: e,
                message: 'Comment not created!'
            })
        })
    });

// Get all replies

router.get('/all', (req, res) => {
    Comments.find({ "deleted": false }, (err, posts) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!posts.length) {
            return res
                .status(404)
                .json({ success: false, error: `Post not found` })
            }
        return res.status(200).json({ success: true, data: posts })
    }).catch(err => console.log(err))
})

// Get all replies for a given post ID below:

router.get('/all/:id', async (req, res) => {
    await Comments.find({ post_id: req.params.id, "deleted": false }, (err, reply) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!reply) {
            return res
                .status(404)
                .json({ success: false, error: `Replies not found` })
        }
        return res.status(200).json({ success: true, data: reply })
    })
    .catch(err => console.log(err))
})

// Upvote a comment

router.post('/upvote/:id', passport.authenticate('jwt', { session: false }),
    async function (req, res) {
        await Comments.findOneAndUpdate(
            {
                _id: req.params.id,
                upvotedBy: { "$ne": req.user._id }
            },
            {
                "$inc": { "points": 1 },
                "$pull": { "downvotedBy": req.user._id },
                "$push": { "upvotedBy": req.user._id }
            },
            (err) => {
                if (err) {
                    return res.status(404).json({
                        success: false,
                        error: err,
                        message: 'Post not found!',
                    })
                }
                return res.status(200).json({ success: true })
            })
            .catch(err => console.log(err))
    })

// Downvote a comment

router.post('/downvote/:id', passport.authenticate('jwt', { session: false }),
    async function (req, res) {
        await Comments.findOneAndUpdate(
            {
                _id: req.params.id,
                downvotedBy: { "$ne": req.user._id }
            },
            {
                "$inc": { "points": -1 },
                "$pull": { "upvotedBy": req.user._id },
                "$push": { "downvotedBy": req.user._id }
            },
            (err) => {
                if (err) {
                    return res.status(404).json({
                        success: false,
                        error: err,
                        message: 'Post not found!',
                    })
                }
                return res.status(200).json({ success: true })
            })
            .catch(err => console.log(err))
    })

// Get count of replies for a given post

router.get('/count/id/:id', async (req, res) => {
    await Comments.count({ post_id: req.params.id, "deleted": false }, (err, comment) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!comment) {
            return res
                .status(404)
                .json({ success: false, error: `Replies not found` })
        }
        return res.status(200).json({ success: true, data: comment })
    })
    .catch(err => console.log(err))
})

// Delete a reply on a post

router.put('/delete/id/:id', passport.authenticate('jwt', { session: false }),
    async function (req, res) {
        await Comments.findOneAndUpdate(
            {
                _id: req.params.id
            },
            {
                "deleted": true
            },
            (err) => {
                if (err) {
                    return res.status(404).json({
                        success: false,
                        error: err,
                        message: 'Post not found!',
                    })
                }
                return res.status(200).json({ success: true })
            })
            .catch(err => console.log(err))
    })

// Get specific reply
router.get('/id/:id', async (req, res) => {
    await Comments.findOne({ _id: req.params.id }, (err, comment) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!comment) {
            return res
                .status(404)
                .json({ success: false, error: `Comment not found` })
        }
        return res.status(200).json({ success: true, data: comment })
    }).catch(err => console.log(err))
})

module.exports = router;
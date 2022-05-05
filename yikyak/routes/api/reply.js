const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");

const passport = require("passport");

// Load Replies model
const Replies = require("../../models/Replies");

// Add new reply
// Moved to the posts route

// router.post('/newReply', (req, res) => {
//     const body = req.body
//     // const user = req.user

//     if (!body) {
//         return res.status(400).json({
//             success: false,
//             error: 'No text entered!',
//         })
//     }

//     const reply = new Replies(body)
//     if (!reply) {
//         return res.status(400).json({ success: false, error: err })
//     }

//     reply
//         .save()
//         .then(() => {
//             return res.status(201).json({
//                 success: true,
//                 id: reply._id,
//                 message: 'Reply created!',
//                 reply: reply.reply,
//                 points: reply.points,
//                 // replies: reply.replies,
//                 createdAt: reply.createdAt
//             })
//         })
//         .catch(error => {
//             return res.status(400).json({
//                 error,
//                 message: 'Reply not created!',
//             })
//         })
//     });

// Get all replies

router.get('/allReplies', (req, res) => {
    Replies.find({}, (err, posts) => {
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
// Moved to the posts route

// router.get('/allReplies/post/:id', async (req, res) => {
//     await Replies.find({ post_id: req.params.id }, (err, reply) => {
//         if (err) {
//             return res.status(400).json({ success: false, error: err })
//         }

//         if (!reply) {
//             return res
//                 .status(404)
//                 .json({ success: false, error: `Replies not found` })
//         }
//         return res.status(200).json({ success: true, data: reply })
//     })
//     .catch(err => console.log(err))
// })

// Update a given post - used for upvote/downvote function

router.post('/upvote/:id', passport.authenticate('jwt', { session: false }),
    async function (req, res) {
        await Replies.findOneAndUpdate(
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

// Downvote a reply

router.post('/downvote/:id', passport.authenticate('jwt', { session: false }),
    async function (req, res) {
        await Replies.findOneAndUpdate(
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

router.get('/count/:id', async (req, res) => {
    await Replies.count({ post_id: req.params.id }, (err, reply) => {
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

module.exports = router;
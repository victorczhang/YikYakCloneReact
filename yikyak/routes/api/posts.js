const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");
const mongoose = require("mongoose");
const passport = require("passport");
const ObjectId = require('mongodb').ObjectID

// Load Posts model
const Posts = require("../../models/Posts");
const Replies = require("../../models/Replies");

// import mongoose from 'mongoose';

// @route POST api/post/newPost
// @desc Make a new post
// @access Public


// Make a new post

router.post('/newPost', (req, res) => {
    const body = req.body
    // const user = req.user

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'No text entered!',
        })
    }

    const post = new Posts(body)

    if (!post) {
        return res.status(400).json({ success: false, error: err })
    }

    post
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: post._id,
                message: 'Post created!',
                // data: [
                //     post: post.post,
                //     points: post.points,
                //     replies: post.replies
                // ]
                post: post.post,
                points: post.points,
                replies: post.replies,
                createdAt: post.createdAt
                // test: user._id,
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Post not created!',
            })
        })
    // console.log(body)
});

// Get all posts

router.get('/allPosts', (req, res) => {
    // const user = req.user

    Posts.find({}, (err, posts) => {
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

// Get specific post

router.get('/post/:id', async (req, res) => {
    await Posts.findOne({ _id: req.params.id }, (err, posts) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!posts) {
            return res
                .status(404)
                .json({ success: false, error: `Post not found` })
        }
        return res.status(200).json({ success: true, data: posts })
    }).catch(err => console.log(err))
})

// Get posts for specific user id 

router.get('/post/user/:id', async (req, res) => {
    await Posts.find({ user_id: req.params.id }, (err, posts) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!posts) {
            return res
                .status(404)
                .json({ success: false, error: `Posts not found` })
        }
        return res.status(200).json({ success: true, data: posts })
    }).catch(err => console.log(err))
})

// Update a given post - used for upvote/downvote function

router.post('/upvote/:id', passport.authenticate('jwt', { session: false }),
    async function (req, res) { 
        await Posts.findOneAndUpdate(
            {
                _id: req.params.id,
                upvotedBy: { "$ne": req.user._id },
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

router.post('/downvote/:id', passport.authenticate('jwt', { session: false }),
    async function (req, res) {
        await Posts.findOneAndUpdate(
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

// Delete a given post

router.delete('/post/:id', async (req, res) => {
    await Posts.findOneAndDelete({ _id: req.params.id }, (err, posts) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!posts) {
            return res
                .status(404)
                .json({ success: false, error: `Post not found` })
        }

        return res.status(200).json({ success: true, data: posts })
    })
        .catch(err => console.log(err))
})

// Add a comment to post

router.post('/newReply/:id', async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'No text entered!',
        })
    }

    const reply = new Replies(body)
    if (!reply) {
        return res.status(400).json({ success: false, error: err })
    }

    const filter = { _id: req.params.id }
    const update =  {
        "$inc": { "replies": 1 },
        "$push": { comments: reply },
    }

    Posts.findByIdAndUpdate(filter, update, function (err) {
        if (err) {
            return res.status(404).json({
                success: false,
                error: err,
                message: 'Post not found!',
            })
        } else {
            // res.send(doc)
            return res.status(200).json({
                success: true,
                id: reply._id,
                message: 'Reply created!',
                reply: reply.reply,
                points: reply.points,
                createdAt: reply.createdAt
            })
        }
    })
})

// Get replies for a given post

router.get('/allReplies/:id', async (req, res) => {
        await Posts.find({ _id: req.params.id }, (err, comments) => {
            if (err) {
                return res.status(400).json({ success: false, error: err })
            }
    
            if (!comments) {
                return res
                    .status(404)
                    .json({ success: false, error: `Replies not found` })
            }
            return res.status(200).json({ success: true, data: comments })
        }).select('comments')
        .catch(err => console.log(err))
    })

// Delete a reply on a post

// .update({'_id': ObjectId("5e892c4eea788336a42694f9") }, { '$pull': { 'comments': ObjectId("5e892c55ea788336a42694fa")}});

router.post('/:id/reply/:replyid', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const filter = { _id: req.params.id }
    const update = {
        "$inc": { "replies": -1 },
        "$pull": { "comments": { _id: mongoose.Types.ObjectId(req.params.replyid) }},
    }

    Posts.findByIdAndUpdate(filter, update, function (err) {
        if (err) {
            return res.status(404).json({
                success: false,
                error: err,
                message: 'Post not found!',
            })
        } 
        else {
            return res.status(200).json({
        //         success: true,
        //         id: reply._id,
                message: 'Reply deleted!',
        //         reply: reply.reply,
        //         points: reply.points,
        //         createdAt: reply.createdAt
            })
        }
    })
})

// Upvote a reply on a post

router.post("/upvote/reply/id/:id", passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const result = await Posts.findOneAndUpdate(
            { 
                "comments._id": mongoose.Types.ObjectId(req.params.id),
                "comments.$.upvotedBy" : { "$ne": Mongoose.Types.ObjectId(req.user._id) }
            },
            {
                $inc: { "comments.$.points": 1 },
                $push: { "comments.$.upvotedBy": req.user._id },
                $pull: { "comments.$.downvotedBy": req.user._id },
            }
        );
        return res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            error: error.message,
            message: "Post not upvoted!",
        });
    }
});

// Downvote a reply on a post

router.post("/downvote/reply/id/:id", passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const result = await Posts.findOneAndUpdate(
            { 
                "comments._id": mongoose.Types.ObjectId(req.params.id),
                "comments.$.downvotedBy" : { "$ne": req.user._id }
            },
            {
                $inc: { "comments.$.points": -1 },
                $pull: { "comments.$.upvotedBy": req.user._id },
                $push: { "comments.$.downvotedBy": req.user._id },
            }
        );
        return res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            error: error.message,
            message: "Post not upvoted!",
        });
    }
});
                    
// Check if a user has voted on a post

router.get('/votedPost/:id', passport.authenticate('jwt', { session: false }), 
    async (req, res) => {
        const filter = { 
            _id: req.params.id, 
            'upvotedBy': req.user._id 
            // 'upvotedBy': 'test123'
        }

        Posts.find(filter, function (err, posts) {
            // let hasVoted = false

            if (err) {
                return res.status(404).json({
                    success: false,
                    error: err,
                    message: 'Post not found!',
                })
            } 
            else {
                return res.status(200).json({
                    success: true,
                    message: 'Post found!',
                    data: posts,
                })
            }
        })
    // res.send('foo')
})

router.get('/yakarma/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    // console.log(typeof JSON.stringify(req.user._id))
    // console.log(JSON.stringify(req.user._id))
    // res.send(req.user._id)
    // console.log('test')

    // const user_id = JSON.stringify(req.user._id)

    // console.log(user_id)
    
    await Posts.aggregate([
        { $match: { 'user_id': req.params.id } },
        { $group: { '_id': null, points: { $sum: "$points" } } },
    ],
    (err, result) => {
        // console.log('test')

        if (err) {
            return res.status(404).json({
                success: false,
                error: err,
                message: 'Yakarma could not be totalled',

            })
        }
        else {
            // console.log(req.user)
            return res.status(200).json({
                success: true,
                message: 'Yakarma found!',
                data: result,
            })
        }
    })
    // console.log('test 2')
})

module.exports = router;
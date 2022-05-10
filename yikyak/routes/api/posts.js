const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");
const mongoose = require("mongoose");
const passport = require("passport");
// const ObjectId = require('mongodb').ObjectID

// Load Posts model
const Posts = require("../../models/Posts");


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

// Check the posts a user has upvoted

router.get('/upvotedPosts', passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const filter = {
            'upvotedBy': mongoose.Types.ObjectId(req.user._id)
        }

        Posts.find(filter, function (err, posts) {
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
    })

// Check the posts a user has downvoted

router.get('/downvotedPosts', passport.authenticate('jwt', { session: false }), 
    async (req, res) => {
        const filter = {
            'downvotedBy': mongoose.Types.ObjectId(req.user._id)
        }

        Posts.find(filter, function (err, posts) {
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
    })
                    
router.get('/yakarma/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
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
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import axios from "axios";

class Post extends Component {
    constructor() {
        super()
        this.state = {
            hasUpvoted: false,
            hasDownvoted: false,
            numOfComments: 0,
        }
    }

    componentDidMount = () => {
        this.handleGetVotedPosts(this.props.id);
        this.getNumOfComments(this.props.id);
    }

    getNumOfComments = (id) => {
        try {
            axios
                .get(`/api/comments/count/id/${id}`)
                .then(res => {
                    if (res.data.data > 0) {
                        this.setState({
                            numOfComments: res.data.data
                        })
                    }
                })
        }
        catch (err) {
            console.log(err)
        }
        // console.log(req.user._id)
    }

    handleUpvoteChange = () => {
        this.setState({
            hasUpvoted: true,
            hasDownvoted: false
        })
    }

    handleDownvoteChange = () => {
        this.setState({
            hasUpvoted: false,
            hasDownvoted: true,
        })
    }

    onClickUpvote = e => {
        this.handleUpvoteChange()
        this.props.handleUpvote()
    }

    onClickDownvote = e => {
        this.handleDownvoteChange()
        this.props.handleDownvote()
    }

    handleGetVotedPosts = (id) => {
        try {
            axios
                .get(`/api/posts/post/${id}`)
                .then(res => {
                    let upvotedPosts = res.data.data.upvotedBy;
                    let downvotedPosts = res.data.data.downvotedBy;
                    let userId = this.props.auth;
                    if (upvotedPosts.includes(userId)) {
                        this.setState({
                            hasUpvoted: true
                        })
                    }
                    else if (downvotedPosts.includes(userId)) {
                        this.setState({
                            hasDownvoted: true
                        })
                    }
                })
        }
        catch (err) {
            console.log(err)
        }
    }

    render() {
        const date = new Date(this.props.createdAt)
        const formattedTimestamp = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear()
        let upvoteStyle = { color: this.state.hasUpvoted ? 'rgb(48,219,189)' : 'rgba(138, 138, 138, 0.5)' }
        let downvoteStyle = { color: this.state.hasDownvoted ? 'rgb(48,219,189)' : 'rgba(138, 138, 138, 0.5)' }

        return (
            <div className='post'>
                <div className='postMain'>
                    <div className='postText'>
                        <p className='postTextMain'>{this.props.post}</p>
                    </div>
                    <div className='postDetails'>
                        <p className='postTimestamp'>{formattedTimestamp}</p>
                        <p className='postReplies'><Link to={`/post/${this.props.id}`}>{this.state.numOfComments} {this.state.numOfComments == 1 ? 'comment' : 'comments'}</Link></p>
                    </div>
                </div>
                <div className='postScore'>
                    <button
                        style={upvoteStyle}
                        disabled={this.state.hasUpvoted ? 'disabled' : ''}
                        className="material-icons"
                        onClick={this.onClickUpvote}
                    >
                        keyboard_arrow_up
                    </button>
                    <div><p className='postPoints'>{this.props.points}</p></div>
                    <button
                        style={downvoteStyle}
                        className="material-icons"
                        disabled={this.state.hasDownvoted ? 'disabled' : ''}
                        onClick={this.onClickDownvote}
                    >
                        keyboard_arrow_down
                    </button>
                </div>
            </div>
        )
    }
}

export default Post
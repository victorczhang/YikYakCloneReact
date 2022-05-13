import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import axios from 'axios'

class UserPost extends Component {
    constructor() {
        super()
        this.state = {
            numOfComments: 0,
            hasUpvoted: false,
            hasDownvoted: false
        }
    }

    componentDidMount = () => {
        this.getNumOfComments(this.props.id);
        this.handleGetVotedPost(this.props.id);
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

    handleGetVotedPost = (id) => {
        try {
            axios
                .get(`/api/posts/post/${id}`)
                .then(res => {
                    let upvotedComments = res.data.data.upvotedBy;
                    let downvotedComments = res.data.data.downvotedBy;
                    let userId = this.props.auth;
                    if (upvotedComments.includes(userId)) {
                        this.setState({
                            hasUpvoted: true
                        })
                    }
                    else if (downvotedComments.includes(userId)) {
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

        return (
            <div className='post'>
                <div className='postMain'>
                    <div className='postText'>
                        <p>{this.props.post}</p>
                    </div>
                    <div className='postDetails'>
                        <p className='postTimestamp'>{formattedTimestamp}</p>
                        <p className='postReplies'><Link to={`/post/${this.props.id}`}>{this.state.numOfComments} {this.state.numOfComments == 1 ? 'comment' : 'comments'}</Link></p>
                        <i className="material-icons delete" onClick={this.props.handleDelete}>delete</i>
                    </div>
                </div>
                <div className='postScore'>
                    <button
                        // className='upvote'
                        disabled={this.state.hasUpvoted ? 'disabled' : ''}
                        style={{ color: this.state.hasUpvoted ? 'rgb(48,219,189)' : 'rgba(138, 138, 138, 0.5)' }}
                        className="material-icons"
                        onClick={this.onClickUpvote}
                    >
                        keyboard_arrow_up
                    </button>
                    <p className='postPoints'>{this.props.points}</p>
                    <button
                        // className='downvote'
                        disabled={this.state.hasDownvoted ? 'disabled' : ''}
                        style={{ color: this.state.hasDownvoted ? 'rgb(48,219,189)' : 'rgba(138, 138, 138, 0.5)' }}
                        className="material-icons"
                        onClick={this.onClickDownvote}
                    >
                        keyboard_arrow_down
                    </button>
                </div>
            </div>
        )
    }
}

export default UserPost
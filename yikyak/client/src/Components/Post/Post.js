import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import axios from "axios";

class Post extends Component {
    constructor() {
        super()
        this.state = {
            hasUpvoted: false,
            hasDownvoted: false,
        }
    }

    componentDidMount = () => {
        this.handleGetUpvotedPosts(this.props.id);
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

    handleGetUpvotedPosts = (id) => {
        try {
            axios
                .get(`/api/posts/post/${id}`)
                .then(res => {
                    let upvotedPosts = res.data.data.upvotedBy;
                    let downvotedPosts = res.data.data.downvotedBy;
                    let userId = this.props.auth.user.id;
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
        return (
            <div className='post'>
                <div className='postMain'>
                    <div className='postText'>
                        <p className='postTextMain'>{this.props.post}</p>
                    </div>
                    <div className='postDetails'>
                        <p className='postTimestamp'>{formattedTimestamp}</p>
                        <p className='postReplies'><Link to={`/post/${this.props.id}`}>{this.props.replies} {this.props.replies == 1 ? 'reply' : 'replies'}</Link></p>
                    </div>
                </div>
                <div className='postScore'>
                    <button
                        style={{ color: this.state.hasUpvoted ? 'rgb(48,219,189)' : 'rgba(138, 138, 138, 0.5)' }}
                        disabled={this.state.hasUpvoted ? 'disabled' : ''}
                        className="material-icons"
                        // onClick={this.props.handleUpvote}
                        onClick={this.onClickUpvote}
                    >
                        keyboard_arrow_up
                    </button>
                    <div><p className='postPoints'>{this.props.points}</p></div>
                    <button
                        style={{ color: this.state.hasDownvoted ? 'rgb(48,219,189)' : 'rgba(138, 138, 138, 0.5)' }}
                        className="material-icons"
                        disabled={this.state.hasDownvoted ? 'disabled' : ''}
                        // onClick={this.props.handleDownvote}
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
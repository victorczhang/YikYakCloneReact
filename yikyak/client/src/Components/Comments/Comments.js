import React, { Component } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../../actions/authActions";
import axios from "axios";


class Comments extends Component {
    constructor() {
        super()
        this.state = {
            posts: [],
            isLoading: false,

            hasUpvoted: false,
            hasDownvoted: false,
        }
    }

    componentDidMount = () => {
        this.handleGetVotedReplies(this.props.id);
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
        this.props.handleCommentUpvote()
    }

    onClickDownvote = e => {
        this.handleDownvoteChange()
        this.props.handleCommentDownvote()
    }

    handleGetVotedReplies = (id) => {
        try {
            axios
                .get(`/api/comments/id/${id}`)
                .then(res => {
                    let upvotedComments = res.data.data.upvotedBy;
                    let downvotedComments = res.data.data.downvotedBy;
                    let userId = this.props.user_id;
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

        if (this.props.user.user.id === this.props.user_id) {
            return (
                <div className='reply'>
                    <div className='replyMain'>
                        <div className='replyText'>
                            <p>{this.props.comment}</p>
                        </div>
                        <div className='replyDetails'>
                            <p className='replyTimestamp'>{formattedTimestamp}</p>
                            <button
                                className='replyControlColumn'
                                onClick={this.props.handleDelete}
                            >DELETE</button>
                        </div>
                    </div>
                    <div className='replyScore'>
                        <button
                            style={{ color: this.state.hasUpvoted ? 'rgb(48,219,189)' : 'rgba(138, 138, 138, 0.5)' }}
                            disabled={this.state.hasUpvoted ? 'disabled' : ''}
                            className="material-icons"
                            onClick={this.onClickUpvote}
                        >
                            keyboard_arrow_up
                        </button>
                        <p className='replyPoints'>{this.props.points}</p>
                        <button
                            style={{ color: this.state.hasDownvoted ? 'rgb(48,219,189)' : 'rgba(138, 138, 138, 0.5)' }}
                            disabled={this.state.hasDownvoted ? 'disabled' : ''}
                            className="material-icons"
                            onClick={this.onClickDownvote}
                        >
                            keyboard_arrow_down
                        </button>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className='reply'>
                    <div className='replyMain'>
                        <div className='replyText'>
                            <p>{this.props.reply}</p>
                        </div>
                        <div className='replyDetails'>
                            <p className='replyTimestamp'>{formattedTimestamp}</p>
                            {/* <button 
                                            className='replyControlColumn'
                                            onClick={this.props.handleDelete}
                                        >DELETE</button> */}
                        </div>
                    </div>
                    <div className='replyScore'>
                        <button
                            className="material-icons"
                            disabled={this.state.hasUpvoted ? 'disabled' : ''}
                            onClick={this.onClickUpvote}
                            style={{ color: this.state.hasUpvoted ? 'rgb(48,219,189)' : 'rgba(138, 138, 138, 0.7)' }}
                        >
                            keyboard_arrow_up
                        </button>
                        <div><p className='replyPoints'>{this.props.points}</p></div>
                        <button
                            className="material-icons"
                            disabled={this.state.hasDownvoted ? 'disabled' : ''}
                            onClick={this.onClickDownvote}
                            style={{ color: this.state.hasDownvoted ? 'rgb(48,219,189)' : 'rgba(138, 138, 138, 0.7)' }}
                        >
                            keyboard_arrow_down
                        </button>
                    </div>
                </div>
            )
        }
    }
}

export default Comments
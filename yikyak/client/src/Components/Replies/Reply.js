import React, { Component } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../../actions/authActions";


class Reply extends Component {
    constructor() {
        super()
        this.state = {
            posts: [],
            isLoading: false,

            hasUpvoted: false,
            hasDownvoted: false,
        }
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
        this.props.handleReplyUpvote()
    }

    onClickDownvote = e => {
        this.handleDownvoteChange()
        this.props.handleReplyDownvote()
    }

    render() {
        const date = new Date(this.props.createdAt)
        const formattedTimestamp = (date.getMonth()+1) + '/' + date.getDate() + '/' +date.getFullYear()

        if (this.props.user.user.id === this.props.user_id) {
            return (
                <div className='reply'>
                    <div className='replyMain'>
                        <div className='replyText'>
                            <p>{this.props.reply}</p>
                        </div>
                        <div className='replyDetails'>
                            <p className='replyTimestamp'>{formattedTimestamp}</p>
                            <button
                                className='replyControlColumn'
                                onClick={this.onClickUpvote}
                            >DELETE</button>
                        </div>
                    </div>
                    <div className='replyScore'>
                        <button 
                            style={{color: this.state.hasUpvoted ? 'rgb(48,219,189)' : 'rgba(138, 138, 138, 0.7)' }}
                            className="material-icons"
                            onClick={this.props.handleReplyUpvote}
                        >
                            keyboard_arrow_up
                        </button>
                        <p className='replyPoints'>{this.props.points}</p>
                        <button 
                            style={{color: this.state.hasUpvoted ? 'rgb(48,219,189)' : 'rgba(138, 138, 138, 0.7)' }}
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
                            onClick={this.onClickUpvote}
                            style={{color: this.state.hasUpvoted ? 'rgb(48,219,189)' : 'rgba(138, 138, 138, 0.7)' }}
                        >
                            keyboard_arrow_up
                        </button>
                        <div><p className='replyPoints'>{this.props.points}</p></div>
                        <button 
                            className="material-icons"
                            onClick={this.onClickDownvote}
                            style={{color: this.state.hasDownvoted ? 'rgb(48,219,189)' : 'rgba(138, 138, 138, 0.7)' }}
                        >
                            keyboard_arrow_down
                        </button>
                    </div>
                </div>
            )
        }
    }
}

export default Reply
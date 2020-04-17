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
        }
    }

    render() {
        if (this.props.user.user.id === this.props.user_id) {
            return (
                <div className='reply'>
                    <div className='replyMain'>
                        <div className='replyText'>
                            <p>{this.props.reply}</p>
                        </div>
                        <div className='replyDetails'>
                            <p className='replyTimestamp'>{this.props.createdAt}</p>
                            <button
                                className='replyControlColumn'
                                onClick={this.props.handleDelete}
                            >DELETE</button>
                        </div>
                    </div>
                    <div className='replyScore'>
                        <button 
                            className='upvote'
                            onClick={this.props.handleReplyUpvote}
                        >
                            &#9650;
                        </button>
                        <p className='replyPoints'>{this.props.points}</p>
                        <button 
                            className='downvote'
                            onClick={this.props.handleReplyDownvote}
                        >
                            &#9660;
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
                            <p className='replyTimestamp'>{this.props.createdAt}</p>
                            {/* <button 
                                            className='replyControlColumn'
                                            onClick={this.props.handleDelete}
                                        >DELETE</button> */}
                        </div>
                    </div>
                    <div className='replyScore'>
                        <button 
                            className='upvote'
                            onClick={this.props.handleReplyUpvote}
                        >
                            <span className="material-icons">keyboard_arrow_up</span>
                        </button>
                        <p className='replyPoints'>{this.props.points}</p>
                        <button 
                            className='downvote'
                            onClick={this.props.handleReplyDownvote}
                        >
                            <span className="material-icons">keyboard_arrow_down</span>
                        </button>
                    </div>
                </div>
            )
        }
    }
}

export default Reply
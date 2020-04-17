import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

class UserPost extends Component {
    constructor() {
        super()
        this.state = {

        }
    }
    
    render() {
        return (
            <div className='post'>
                <div className='postMain'>
                    <div className='postText'>
                        <p>{this.props.post}</p>
                    </div>
                    <div className='postDetails'> 
                        <p className='postTimestamp'>{this.props.createdAt}</p>
                        <p className='postReplies'><Link to={`/post/${this.props.id}`}>{this.props.replies} {this.props.replies == 1 ? 'reply' : 'replies'}</Link></p>
                        <button className='postControlColumn' 
                            onClick={this.props.handleDelete}
                        >
                            DELETE
                        </button>
                    </div>
                </div>
                <div className='postScore'>
                    <button 
                        className='upvote' 
                        // onClick={this.props.handleUpvote}
                    >
                            <span className="material-icons">keyboard_arrow_up</span>
                        </button>
                    <p className='postPoints'>{this.props.points}</p>
                    <button 
                        className='downvote' 
                        // onClick={this.props.handleDownvote}
                    >
                        <span className="material-icons">keyboard_arrow_down</span>
                    </button>
                </div>
            </div>
        )
    }
}

export default UserPost
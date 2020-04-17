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
                        // className='upvote'
                        className="material-icons" 
                        // onClick={this.props.handleUpvote}
                    >
                            keyboard_arrow_up
                        </button>
                    <p className='postPoints'>{this.props.points}</p>
                    <button 
                        // className='downvote'
                        className="material-icons"> 
                        // onClick={this.props.handleDownvote}
                    >
                        keyboard_arrow_down
                    </button>
                </div>
            </div>
        )
    }
}

export default UserPost
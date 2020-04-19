import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

class Post extends Component {
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
                        <p className='postTextMain'>{this.props.post}</p>
                    </div>
                    <div className='postDetails'> 
                        <p className='postTimestamp'>{this.props.createdAt}</p> 
                        <p className='postReplies'><Link to={`/post/${this.props.id}`}>{this.props.replies} {this.props.replies == 1 ? 'reply' : 'replies'}</Link></p>
                    </div>
                </div>
                <div className='postScore'>
                    <button
                        className="material-icons"
                        onClick={this.props.handleUpvote}
                    >
                        keyboard_arrow_up
                    </button>
                    <p className='postPoints'><span>{this.props.points}</span></p>
                    <button 
                        className="material-icons"
                        onClick={this.props.handleDownvote}
                    >
                        keyboard_arrow_down
                    </button>
                </div>
            </div>
        )
    }
}

export default Post
import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

class Post extends Component {
    constructor() {
        super()
        this.state = {

        }
    }

    testFunc = () => {
        this.props.handleUpvote()
        this.props.handleCheck()
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
                        <p className='postReplies'><Link to={`/post/${this.props.id}`}>{this.props.replies} replies</Link></p>
                        {/* <button className='postControlColumn' 
                            // onClick={this.props.handleDelete}
                            >DEL
                        </button> */}
                    </div>
                </div>
                <div className='postScore'>
                    <button 
                        className = 'downvote'
                        onClick={this.props.handleUpvote}
                        // disabled={this.props.disabledUpvote}
                        // onClick={this.testFunc}
                    >
                        <span className="material-icons">keyboard_arrow_up</span>
                        {/* TEST */}
                    </button>
                    <p className='postPoints'><span>{this.props.points}</span></p>
                    <button 
                        className='downvote' 
                        onClick={this.props.handleDownvote}
                        // disabled={this.props.disabledDownvote}
                    >
                            <span className="material-icons">keyboard_arrow_down</span></button>
                </div>
            </div>
        )
    }
}

export default Post
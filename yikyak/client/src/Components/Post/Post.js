import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

class Post extends Component {
    constructor() {
        super()
        this.state = {
            hasVoted: false,
        }
    }
   
    handleChange = () => {
        this.setState({ hasVoted: !this.state.hasVoted })
    }

    onClickHandler = e => {
        this.handleChange()
        this.props.handleUpvote()
    }

    render() {
        const date = new Date(this.props.createdAt)
        const formattedTimestamp = (date.getMonth()+1) + '/' + date.getDate() + '/' +date.getFullYear()

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
                        style={{color: this.state.hasVoted ? 'rgb(48,219,189)' : 'rgba(138, 138, 138, 0.7)' }}
                        className="material-icons"
                        // onClick={this.props.handleUpvote}
                        onClick={this.onClickHandler}
                    >
                        keyboard_arrow_up
                    </button>
                    <p className='postPoints'><span>{this.props.points}</span></p>
                    <button
                        style={{color: this.state.hasVoted ? 'rgb(48,219,189)' : 'rgba(138, 138, 138, 0.7)' }}
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
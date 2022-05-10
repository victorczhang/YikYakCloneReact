import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import axios from 'axios'

class UserPost extends Component {
    constructor() {
        super()
        this.state = {
            numOfComments: 0
        }
    }

    componentDidMount = () => {
        this.getNumOfComments(this.props.id);
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
    
    render() {
        const date = new Date(this.props.createdAt)
        const formattedTimestamp = (date.getMonth()+1) + '/' + date.getDate() + '/' +date.getFullYear()

        return (
            <div className='post'>
                <div className='postMain'>
                    <div className='postText'>
                        <p>{this.props.post}</p>
                    </div>
                    <div className='postDetails'> 
                        <p className='postTimestamp'>{formattedTimestamp}</p>
                        <p className='postReplies'><Link to={`/post/${this.props.id}`}>{this.state.numOfComments} {this.state.numOfComments == 1 ? 'comment' : 'comments'}</Link></p>
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
                        className="material-icons"
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
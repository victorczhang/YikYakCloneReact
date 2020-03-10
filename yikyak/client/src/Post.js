import React, {Component} from 'react'

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
                        <p>Bus Down</p>
                    </div>
                    <div className='postDetails'> 
                        <p className='postTimestamp'>4 years ago</p>
                        <p className='postReplies'>5 replies</p>
                        <p className='postControlColumn'>&hellip;</p>
                    </div>
                </div>
                <div className='postScore'>
                    <button className='upvote'>&#9650;</button>
                    <p className='postPoints'>90</p>
                    <button className='downvote'>&#9660;</button>
                </div>
            </div>
        )
    }
}

export default Post
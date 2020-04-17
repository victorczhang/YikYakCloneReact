import React, { Component } from 'react'
import axios from 'axios'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import UserHeader from '../Header/UserHeader'
import { logoutUser } from "../../actions/authActions";
import Post from '../Post/Post'
import Reply from '../Replies/Reply'

class SinglePostView extends Component {
    constructor() {
        super()
        this.state = {
            charsLeft: 200,
            isLoading: false,
            reply: '',
            data: [],
            replies: [],

            replyCount: 0,
            points: '',
        }
    }

    componentDidMount() {
        this.fetchPost()
        this.fetchReplies()
    }

    async fetchReplies() {
        try {
            this.setState(
                { isLoading: true }
            )
            axios
                .get(`/api/posts/allReplies/${this.props.match.params.id}`)
                .then(res => 
                    // {
                        // const {posts} = this.state
                        // // console.log(res.data)
                        // posts.push(res.data)
                        // this.setState({posts})
                    // }
                    // console.log(res.data.data[0].comments)
                    this.setState({
                        replies: res.data.data[0].comments,
                        isLoading: false,
                    }),
                )
        } catch (err) {
            this.setState({
                isLoading: false
            })
            console.log(err.status)
        }
        // console.log(this.state.replies)
    }

    async fetchPost() {
        try {
            this.setState(
                { isLoading: true }
            )
            axios
                .get(`/api/posts/post/${this.props.match.params.id}`)
                .then(res =>
                    this.setState(prevState => ({
                        data: [...prevState.data, res.data.data],
                        // replyCount: res.data.data.replies,
                        isLoading: false,
                    })),
                )
        } catch (err) {
            this.setState({
                isLoading: false
            })
            console.log(err.status)
        }
    }

    handleChange = e => {
        let input = e.target.value
        this.setState(
            {
                charsLeft: 200 - input.length,
                reply: input
            })
    }

    onSubmit = e => {
        const { user } = this.props.auth

        e.preventDefault()
        const newReply = new Reply()
        newReply.reply = this.state.reply
        newReply.user_id = user.id
        newReply.post_id = this.props.match.params.id

        try {
            this.setState({
                isLoading: true
            })
            axios
                .post(`/api/posts/newReply/${this.props.match.params.id}`, newReply)
                .then(res => {
                    // console.log(res)
                    const {replies} = this.state
                    replies.push(res.data)
                    // console.log(res.data)
                    this.setState({replies})

                    this.setState({
                        isLoading: false
                    })
                })
        } 
        catch (err) {
            console.log(err)
            this.setState(
                { isLoading: false }
            )
        }
    }

    handleUpvote = (id) => {
        this.setState(prevState => {
            const updatedPosts = prevState.data.map(item => {
                if (item._id === id) {
                    try {
                        axios
                            .post(`/api/posts/upvote/${id}`)
                            .then(res => {
                                console.log(res)
                                // ...item,
                                // const {posts} = this.state
                                // posts.push(res.data)
                                // this.setState({posts})
                            })
                    }
                    catch (err) {
                        console.log(err)
                    }
                    return {
                        ...item,
                        // voted: true,
                        points: item.points + 1
                    }
                }
                return item
            })
            return {
                data: updatedPosts
            }
        })
    }

    handleDownvote = (id) => {
        this.setState(prevState => {
            const updatedPosts = prevState.data.map(item => {
                if (item._id === id) {
                    try {
                        axios
                            .post(`/api/posts/downvote/${id}`)
                            .then(res => {
                                // console.log(res)
                                // ...item,
                                // const {posts} = this.state
                                // posts.push(res.data)
                                // this.setState({posts})
                            })
                    }
                    catch (err) {
                        console.log(err)
                    }
                    return {
                        ...item,
                        // voted: true,
                        points: item.points - 1
                    }
                }
                return item
            })
            return {
                data: updatedPosts
            }
        })
    }

    handleReplyUpvote = (id) => {
        this.setState(prevState => {
            const updatedReplies = prevState.replies.map(item => {
                if (item._id === id) {
                    try {
                        axios
                            .post(`/api/posts/upvote/reply/id/${id}`)
                            .then(res => {
                                // console.log(res.data.data[0].comments[0])
                                console.log(res)
                                // ...item,
                                // const {posts} = this.state
                                // posts.push(res.data)
                                // this.setState({posts})
                            })
                    }
                    catch (err) {
                        console.log(err)
                    }
                    return {
                        ...item,
                        // voted: true,
                        points: item.points + 1
                    }
                }
                return item
            })
            return {
                replies: updatedReplies
            }
        })
    }

    handleReplyDownvote = (id) => {
        this.setState(prevState => {
            const updatedReplies = prevState.replies.map(item => {
                if (item._id === id) {
                    try {
                        axios
                            .post(`/api/posts/downvote/reply/id/${id}`)
                            .then(res => {
                                // console.log(res.data.data[0].comments[0])
                                console.log(res)
                                // ...item,
                                // const {posts} = this.state
                                // posts.push(res.data)
                                // this.setState({posts})
                            })
                    }
                    catch (err) {
                        console.log(err)
                    }
                    return {
                        ...item,
                        // voted: true,
                        points: item.points - 1
                    }
                }
                return item
            })
            return {
                replies: updatedReplies
            }
        })
    }

    handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete the reply?')) {
          try {
            this.setState({
                isLoading: true
            })
            axios
                .post(`/api/posts/${this.props.match.params.id}/reply/${id}`)
                .then(res =>
                    console.log(res),
                    // this.fetchPosts(),
                    // this.setState({
                    //     isLoading: false
                    // })
                    )
          }
          catch (err) {
            console.log(err)
            // this.setState({
            //     isLoading: false
            // })
          }
        } 
        // this.fetchPosts()
        // test comment
        // another
        // console.log(id)
        // this.fetchReplies()
    }

    render() {
        const post = this.state.data.slice().map((item, i) =>
            <Post
                key={i}
                post={item.post}
                id={item._id}
                replies={item.replies}
                createdAt={item.createdAt}
                points={item.points}
                handleUpvote={() => this.handleUpvote(item._id)}
                handleDownvote={() => this.handleDownvote(item._id)}
            />
        )

        const replies = this.state.replies.slice().map((item, i) =>
            <div 
                key={i}
                className='replyItem'
            >
                <Reply
                    // key={i}
                    reply={item.reply}
                    id={item._id}
                    user_id={item.user_id}
                    createdAt={item.createdAt}
                    points={item.points}
                    handleDelete={() => this.handleDelete(item._id)}
                    user={this.props.auth}
                    handleReplyUpvote={() => this.handleReplyUpvote(item._id)}
                    handleReplyDownvote={() => this.handleReplyDownvote(item._id)}
                />
            </div>
        )

        return (
            <div>
                <div>
                    <UserHeader />
                </div>
                <div className='dashboardBackground'>
                    {/* <h1>Green Background</h1> */}
                </div>
                <div className='openPost'>
                    {post}
                </div>
                <div className='newReply'>
                    <form onSubmit={this.onSubmit}>
                        <label>
                            <textarea
                                className='textareaReply'
                                maxLength='200'
                                onChange={this.handleChange}
                                placeholder="Leave a reply..." />
                        </label>
                        <div className='textareaBarReply'>
                            <p className='wordCount'>{this.state.charsLeft}</p>
                            <button className='sendButton'>Send</button>
                        </div>
                    </form>
                </div>
                <div className='feedReply'>
                    {replies}
                </div>
            </div>
        )
    }
}

SinglePostView.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(SinglePostView);
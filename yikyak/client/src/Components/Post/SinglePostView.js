import React, { Component } from 'react'
import axios from 'axios'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import UserHeader from '../Header/UserHeader'
import { logoutUser } from "../../actions/authActions";
import Post from '../Post/Post'
import Comments from '../Comments/Comments'
import Loader from '../Loader/Loader'

class SinglePostView extends Component {
    constructor() {
        super()
        this.state = {
            charsLeft: 200,
            isLoading: false,
            comment: "",
            data: [],
            allComments: [],

            replyCount: 0,
            points: '',
        }
    }

    componentDidMount() {
        this.fetchPost()
        this.fetchComments()
    }

    async fetchComments() {
        try {
            this.setState(
                { isLoading: true }
            )
            axios
                .get(`/api/comments/all/${this.props.match.params.id}`)
                .then(res => 
                    this.setState({
                        allComments: res.data.data,
                        isLoading: false,
                    }),
                    console.log(this.state.allComments)
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
                comment: input
            })
    }

    onSubmit = e => {
        const { user } = this.props.auth
        e.preventDefault()
        const newComment = new Comments()
        newComment.comment = this.state.comment
        newComment.user_id = user.id
        newComment.post_id = this.props.match.params.id

        try {
            this.setState({
                isLoading: true
            })
            axios
                .post("/api/comments/new", newComment)
                .then(res => {
                    // console.log(res)
                    const { allComments } = this.state
                    allComments.push(res.data)
                    // console.log(res.data)
                    this.setState({ allComments })

                    this.setState({
                        isLoading: false,
                        charsLeft: 200,
                        comment: ''
                    })
                    this.fetchComments();
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

    handleCommentUpvote = (id) => {
        this.setState(prevState => {
            const updatedComments = prevState.allComments.map(item => {
                if (item._id === id) {
                    try {
                        axios
                            .post(`/api/comments/upvote/${id}`)
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
                allComments: updatedComments
            }
        })
    }

    handleCommentDownvote = (id) => {
        this.setState(prevState => {
            const updatedComments = prevState.allComments.map(item => {
                if (item._id === id) {
                    try {
                        axios
                            .post(`/api/comments/downvote/${id}`)
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
                allComments: updatedComments
            }
        })
    }

    handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete the reply?')) {
            const currentComments = this.state.comment;
            try {
                this.setState({
                    isLoading: true
                })
                axios
                    .put(`/api/comments/delete/id/${id}`)
                    .then(res =>
                        console.log(res),
                        this.setState({
                            allComments: currentComments.filter(comments => comments._id !== id),
                            isLoading: false
                        })
                    )
            }
            catch (err) {
                console.log(err)
                this.setState({
                    isLoading: false
                })
            }
        }
    }
    
    render() {
        let inputActive = this.state.charsLeft;
        let sendButtonClass = inputActive <= 199 ? "sendButton active" : "sendButton";
        const post = this.state.data.slice().map((item, i) =>
            <Post
                key={i}
                post={item.post}
                id={item._id}
                auth={this.props.auth.user.id}
                replies={item.comment}
                createdAt={item.createdAt}
                points={item.points}
                handleUpvote={() => this.handleUpvote(item._id)}
                handleDownvote={() => this.handleDownvote(item._id)}
            />
        )

        const comments = this.state.allComments.slice().map((item, i) =>
            <div 
                key={i}
                className='replyItem'
            >
                <Comments
                    // key={i}
                    comment={item.comment}
                    id={item._id}
                    user_id={item.user_id}
                    createdAt={item.createdAt}
                    points={item.points}
                    handleDelete={() => this.handleDelete(item._id)}
                    user={this.props.auth}
                    handleCommentUpvote={() => this.handleCommentUpvote(item._id)}
                    handleCommentDownvote={() => this.handleCommentDownvote(item._id)}
                />
            </div>
        )

        if (this.state.isLoading) {
            return (
                <div>
                    <div>
                        <UserHeader />
                    </div>
                    <div className='dashboardBackground'>
                        {/* <h1>Green Background</h1> */}
                    </div>
                    <div className='loadingPage'>
                        <Loader />
                    </div>
                </div>
            )
        }

        return (
            <div>
                <div>
                    <UserHeader />
                </div>
                <div className='dashboardBackground'>
                    {/* <h1>Green Background</h1> */}
                </div>
                <div className='openPost'>
                    <div className='currentPost'>
                        {post}
                    </div>
                    <div className='newReply'>
                        <form onSubmit={this.onSubmit}>
                            <label>
                                <textarea
                                    className='textareaReply'
                                    maxLength='200'
                                    value={this.state.comment}
                                    onChange={this.handleChange}
                                    placeholder="Leave a reply..." />
                            </label>
                            <div className='textareaBarReply'>
                                <div><p className='wordCount'>{this.state.charsLeft}</p></div>
                                <div><button className={sendButtonClass}>Send</button></div>
                            </div>
                        </form>
                    </div>
                    <div className='feedReply'>
                        {comments}
                    </div>
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
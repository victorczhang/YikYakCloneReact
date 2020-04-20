import React, { Component } from 'react'
import axios from 'axios'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import UserHeader from '../Header/UserHeader'
import { logoutUser } from "../../actions/authActions";
import UserPost from '../Post/UserPost'
// import Replies from '../Replies/Reply'
import Reply from '../Replies/Reply'
// import ReplyMode from './'
// import Dashboard from '../Dashboard/Dashboard'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

class Profile extends Component {
    constructor() {
        super()
        this.state = {
            posts: [],
            isLoading: false,
        }
    }

    componentDidMount() {
        this.fetchPosts()
    }

    async fetchPosts() {
        const { user } = this.props.auth
    
        try {
          this.setState(
            { isLoading: true }
          )
          axios
            .get(`/api/posts/post/user/${user.id}`)
            .then(res =>
              this.setState({
                posts: res.data.data,
                isLoading: false,
              })
            )
        } catch (err) {
          this.setState({
            isLoading: false
          })
          console.log(err.status)
        }
    }

    handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete the post?')) {

            const currentPosts = this.state.posts;
            // console.log(currentPosts)

            // this.setState({
            //     posts: currentPosts.filter(posts => posts._id !== id),
            // });

            try {
                this.setState({
                    isLoading: true
                })
                axios
                    .delete(`/api/posts/post/${id}`)
                    .then(res =>
                        console.log(res),
                        this.setState({
                            posts: currentPosts.filter(posts => posts._id !== id),
                            isLoading: false
                        }))
            }
            catch (err) {
                console.log(err)
                this.setState({
                    isLoading: false
                })
            }
        }
        // this.fetchPosts()
    }

    render() {
        // console.log(this.state.posts)

        const sortedPosts = this.state.posts.slice().sort((obj1, obj2) =>
            obj2.createdAt.localeCompare(obj1.createdAt));

        const PostItemComponent = sortedPosts.map((item, i) =>
            <div 
                className='feedItem'
                key={i}
            >
                <UserPost
                    post={item.post}
                    id={item._id}
                    replies={item.replies}
                    createdAt={item.createdAt}
                    points={item.points}
                    handleUpvote={() => this.handleUpvote(item._id, item.points)}
                    handleDownvote={() => this.handleDownvote(item._id, item.points)}
                    handleDelete={() => this.handleDelete(item._id)}
                />
            </div>
        )

        if (this.state.isLoading) {
            return (
                <div className='profilePage'>
                    <div>
                        <UserHeader />
                    </div>
                    <div className='dashboardBackground'>
                        {/* <h1>Green Background</h1> */}
                    </div>
                    <div className='loadingPage'>
                        <h1>Loading</h1>
                    </div>
                </div>
            )
        }

        if (this.state.posts.length < 1 && !this.state.isLoading) {
            return (
                <div className='profilePage'>
                    <div>
                        <UserHeader />
                    </div>
                    <div className='dashboardBackground'>
                        {/* <h1>Green Background</h1> */}
                    </div>
                    <div className='profileContent'>
                        <div className='profileSettings'>
                            <div className='settingsHeading'>
                                <h1>Settings</h1>
                            </div>
                            <div className='settingsList'>
                                <button className='settingsButton'>Change Username</button>
                                <button className='settingsButton'>Change Password</button>
                                <button className='settingsButton'>Privacy</button>
                                <button className='settingsButton'>Blocked Users</button>
                                <button className='settingsButton'>Contact Support</button>
                            </div>
                        </div>
                        <div>
                            <div className='profileHeading'>
                                <h1>My Posts</h1>
                            </div>
                            <div>
                                <div className='noPostsMsg'>
                                    <div>
                                        <h1>You have no posts!</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div className='profilePage'>
                <div>
                    <UserHeader />
                </div>
                <div className='dashboardBackground'>
                </div>
                <div className='profileContent'>
                    <div className='profileSettings'>
                        <div className='settingsHeading'>
                            <h1>Settings</h1>
                        </div>
                        <div className='settingsList'>
                        <button className='settingsButton'>Change Username</button>
                            <button className='settingsButton'>Change Password</button>
                            <button className='settingsButton'>Privacy</button>
                            <button className='settingsButton'>Blocked Users</button>
                            <button className='settingsButton'>Contact Support</button>
                            {/* <button className='settingsButton'></button> */}
                        </div>
                    </div>
                    <div>
                        <div className='profileHeading'>
                            <h1>My Posts</h1>
                        </div>
                        <div> 
                            <div className='myPosts'>
                                {PostItemComponent}
                            </div>
                        </div>
                    </div>
                    {/* <div className='test2'>
                        <h1>Hello 2</h1>
                    </div> */}
                </div>
            </div>
        )
    }
}

Profile.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Profile);
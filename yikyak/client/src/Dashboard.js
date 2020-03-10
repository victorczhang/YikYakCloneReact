import React, { Component } from 'react';
import './App.css';
import Post from './Post'
import UserHeader from './UserHeader'

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "./actions/authActions";

// import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

class Dashboard extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };
    render() {
        const { user } = this.props.auth;
        return (
            <div>
                <div>
                    <UserHeader onLogoutClick={this.onLogoutClick} />
                </div>
                <div className='dashboardBackground'>
                    {/* <h1>Test</h1> */}
                </div>
                <div className='newPost'>
                    <form>
                        <label>
                            <textarea id='textareaPost' maxLength='200' placeholder="What's on your mind?" />
                        </label>
                    </form>
                </div>
                <div className='mainContent'>
                    <div className='feedSidebar'>
                        <div className='userYakarma'>
                            <p id='userPoints'>60,000</p>
                            <p id='userPointsLabel'>Yakarma</p>
                        </div>
                        <div className='featuredPosts'>
                            <div className='featuredPostsHeading'>
                                <p>Featured Posts</p>
                            </div>
                            <p>Post</p>
                            <p>Post</p>
                            <p>Post</p>
                            <p>Post</p>
                        </div>
                        <div className='followUs'>
                            <div className='followUsHeading'>
                                <p>Follow Us</p>
                            </div>
                            <p>Post</p>
                            <p>Post</p>
                            <p>Post</p>
                        </div>
                    </div>
                    <div className='feedContent'>
                        <div className='feedPost'>
                            <Post />
                            <Post />
                            <Post />
                            <Post />
                            <Post />
                            <Post />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth
  });
  export default connect(
    mapStateToProps,
    { logoutUser }
  )(Dashboard);
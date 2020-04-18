import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Post from '../Post/Post'
import UserHeader from '../Header/UserHeader'

import axios from "axios";

class Dashboard extends Component {
  state = {
    charsLeft: 200,
    post: '',
    posts: [],
    isLoading: false,

    replies: [],

    postId: '',
    postText: '',
    replyCount: '',
    points: '',
    deleted: '',

    disabledUpvote: false,
    disableDownvote: false,

    totalYakarma: '',

    new: true,
    hot: false,
  }

  componentDidMount = () => {
    this.fetchPosts()
    this.getUserKarma()
  }

  getUserKarma = () => {
    const { user } = this.props.auth;
    // console.log(user)

      try {
        axios
          .get(`/api/posts/yakarma/${user.id}`)
          .then(res => {
            if (res.data.data.length > 0) {
              this.setState({
                totalYakarma: res.data.data[0].points
              })
            }
            else {
              this.setState({
                totalYakarma: 0
              })
            }
            // console.log(res.data.data[0].points)
          })
      }
      catch (err) {
        console.log(err)
      }
      // console.log(req.user._id)
    }

  async fetchPosts() {
    try {
      await axios
        .get("/api/posts/allPosts")
        .then(res =>
          this.setState({
            posts: res.data.data,
            // isLoading: false,
          })
        )
    } catch (err) {
      this.setState({
        isLoading: false
      })
      console.log(err)
    }
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  handleChange = e => {
    let input = e.target.value
    this.setState(
      {
        charsLeft: 200 - input.length,
        post: input
      })
  }

  onSubmit = e => {
    const { user } = this.props.auth

    e.preventDefault()
    const newPost = new Post()
    newPost.post = this.state.post
    newPost.user_id = user.id

    try {
      axios
        .post("/api/posts/newPost", newPost)
        .then(res => {
          const {posts} = this.state
          // console.log(res.data)
          posts.push(res.data)
          this.setState({posts})
          // this.setState(
          //   {isLoading: false}
          // ),
          // form.reset()
          // console.log(this.state.posts)
          this.setState({
            post: ''
          })
          this.fetchPosts()
        })
      } 
    catch (err) {
      console.log(err)
      this.setState({ 
        isLoading: false 
      })
    }
  }

  handleUpvote = (id) => {
    this.setState(prevState => {
      const updatedPosts = prevState.posts.map(item => {
        if (item._id === id) {
          try {
            axios
              .post(`/api/posts/upvote/${id}`)
              .then(res => {
                console.log(res)
                if (!this.state.disabledUpvote) {
                  this.setState({
                    disabledUpvote: true,
                    disabledDownvote: false
                  })
                }
                // console.log(this.state.disabledUpvote)
                // console.log(this.state.disableDownvote)
              })
          }
          catch (err) {
            console.log(err)
          }
          return {
            ...item,
            points: item.points + 1
            }
          }
        return item
      })
      return {
        posts: updatedPosts
      }
    })
    // console.log(this.state.disabledUpvote)
    // console.log(this.state.disableDownvote)
  }

  handleDownvote = (id) => {
    this.setState(prevState => {
      const updatedPosts = prevState.posts.map(item => {
        if (item._id === id) {
          try {
            axios
              .post(`/api/posts/downvote/${id}`)
              .then(res => {
                console.log(res)
                if (!this.state.disabledDownvote) {
                  this.setState({
                    disabledUpvote: false,
                    disabledDownvote: true
                  })
                }
                // console.log(this.state.disabledUpvote)
                // console.log(this.state.disableDownvote)
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
        posts: updatedPosts
      }
    })
    // console.log(id)
  }

  handleChange = () => {
    this.setState({
        new: !this.state.new,
        hot: !this.state.hot
    })
  }
  
  render() {
    const sortedPosts = this.state.posts.slice().sort((obj1, obj2) =>
      obj2.createdAt.localeCompare(obj1.createdAt));

    // const hotPosts = this.state.posts.slice().sort((obj1, obj2) => 
    //   obj2.points - obj1.points)

    const PostItemComponent = sortedPosts.map((item, i) =>
      <div 
        key={i}
        className='feedItem'
      >
        <Post
          post={item.post}
          id={item._id}
          replies={item.replies}
          createdAt={item.createdAt}
          points={item.points}
          handleUpvote={() => this.handleUpvote(item._id)}
          handleDownvote={() => this.handleDownvote(item._id)}
      />
      </div>
    )

    // const hotPostItemComponent = hotPosts.map((item, i) =>
    //   <div 
    //     key={i}
    //     className='feedItem'
    //   >
    //     <Post
    //       post={item.post}
    //       id={item._id}
    //       replies={item.replies}
    //       createdAt={item.createdAt}
    //       points={item.points}
    //       handleUpvote={() => this.handleUpvote(item._id)}
    //       handleDownvote={() => this.handleDownvote(item._id)}
    //   />
    //   </div>
    // )

    if (this.state.isLoading) {
      return (
        <div>
          <h1>Loading</h1>
        </div>
      )
    }

    return (
      <div className='homePage'>
        <div>
          <UserHeader 
            hot={this.state.hot} 
            new={this.state.new}
            handleChange={this.handleChange()}
          />
        </div>
        <div className='dashboardBackground'>
          {/* <b>Hey there,</b> {user.name.split(" ")[0]} */}
        </div>
        <div className='newPost'>
          <div className='leftPost'>
            {/* <h1>Test</h1> */}
          </div>
          <div className='textareaGrid'>
            <form onSubmit={this.onSubmit}>
              <label>
                <textarea
                  className='textareaPost'
                  maxLength='200'
                  onChange={this.handleChange}
                  value={this.state.post}
                  placeholder="What's on your mind?" />
              </label>
              <div className='textareaBar'>
                <p className='wordCount'>{this.state.charsLeft}</p>
                <button className='sendButton'>Send</button>
              </div>
            </form>
          </div>
        </div>
        <div className='mainContent'>
          <div className='feedSidebar'>
            <div className='userYakarma'>
              <p id='userPoints'>{this.state.totalYakarma}</p>
              <p id='userPointsLabel'>Yakarma</p>
            </div>
            <div className='featuredPosts'>
              <div className='featuredPostsHeading'>
                <p>Featured Posts</p>
              </div>
              <div className='featuredPostsList'>
                <div className='featuredPostsContent'>
                  <p>Why I'm Thankful For Technology</p>
                </div>
                <div className='featuredPostsContent'>
                  <p>TBT: Family Photos</p>
                </div>
                <div className='featuredPostsContent'>
                  <p>Serve Your Herd</p>
                </div>
                <div className='featuredPostsContent'>
                  <p>Throwdown Thursday</p>
                </div>
              </div>
            </div>
            <div className='followUs'>
              <div className='followUsHeading'>
                <p>Follow Us</p>
              </div>
              <div className='followUsList'>
                <div className='followUsContent'>
                  <p>Follow us on Twitter</p>
                </div>
                <div className='followUsContent'>
                  <p>Like us on Facebook</p>
                </div>
                <div className='followUsContent'>
                  <p>Follow us on Instagram!</p>
                </div>
                <div className='followUsContent'>
                  <p>Find your herd</p>
                </div>
                <div className='followUsContent'>
                  <p>Other Top Yaks</p>
                </div>
              </div>
            </div>
          </div>
          <div className='feedContent'>
            <div className='feedPost'>
              {/* { this.state.new ? {PostItemComponent} : {hotPostItemComponent} } */}
              { PostItemComponent }
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
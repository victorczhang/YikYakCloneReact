import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Post from '../Post/Post'
import UserHeader from '../Header/UserHeader'
import Loader from '../Loader/Loader'
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
    points: '',
    deleted: '',

    disabledUpvote: false,
    disableDownvote: false,

    totalYakarma: '',

    new: true,
    hot: false,

    hasVoted: false,

    upvotedPosts: [],
    downvotedPosts: []
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
        .get(`/api/users/yakarma/${user.id}`)
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
    this.setState({
      isLoading: true
    })
    try {
      await axios
        .get("/api/posts/allPosts")
        .then(res =>
          this.setState({
            posts: res.data.data,
            isLoading: false
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
          const { posts } = this.state
          posts.push(res.data)
          this.setState({ posts })
          this.setState({
            post: '',
            charsLeft: 200
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
  }

  handleRadioChange = () => {
    this.setState({
      new: !this.state.new,
      hot: !this.state.hot
    })

    console.log(this.state.new)
    console.log(this.state.hot)
  }

  render() {
    let inputActive = this.state.charsLeft;
    let sendButtonClass = inputActive <= 199 ? "sendButton active" : "sendButton";

    const sortedPosts = this.state.posts.slice().sort((obj1, obj2) =>
      obj2.createdAt.localeCompare(obj1.createdAt));

    const PostItemComponent = sortedPosts.map((item, i) =>
      <div
        // key={i}
        className='feedItem'
      >
        <Post
          key={i}
          post={item.post}
          id={item._id}
          auth={this.props.auth.user.id}
          replies={item.replies}
          createdAt={item.createdAt}
          points={item.points}
          handleUpvote={() => this.handleUpvote(item._id)}
          handleDownvote={() => this.handleDownvote(item._id)}
        />
      </div>
    )

    const feedPost =
      this.state.isLoading ?
        <div className="feedPost loading">
          <Loader />
        </div>
        :
        <div className='feedPost'>
          {/* { this.state.new ? {PostItemComponent} : {hotPostItemComponent} } */}
          {PostItemComponent}
        </div>

    // const HotItemComponent = hotPosts.map((item, i) =>
    //   <div 
    //     // key={i}
    //     className='feedItem'
    //   >
    //     <Post
    //       key={i}
    //       post={item.post}
    //       id={item._id}
    //       replies={item.replies}
    //       createdAt={item.createdAt}
    //       points={item.points}
    //       handleUpvote={() => this.handleUpvote(item._id)}
    //       handleDownvote={() => this.handleDownvote(item._id)}
    //     />
    //   </div>
    // )

    if (this.state.isLoading) {
      return (
        <Loader />
      )
    }
    return (
      <div className='homePage'>
        <div>
          <UserHeader
          // hot={this.state.hot}
          // new={this.state.new}
          // handleRadioChange={() => this.handleRadioChange()}
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
                <div><p className='wordCount'>{this.state.charsLeft}</p></div>
                <div><button className={sendButtonClass}>Send</button></div>
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
            {feedPost}
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
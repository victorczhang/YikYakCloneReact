import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import Loader from "../Loader/Loader"

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
      isLoading: false
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard"); // push user to dashboard when they login
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    try {
      this.setState({
        isLoading: true
      });
      this.props.loginUser(userData)
        .then(() =>
          this.setState({
            isLoading: false
          })
        );
    }
    catch (err) {
      this.setState({
        isLoading: false
      })
      console.log(err.status)
    }
  };

  render() {
    const { errors } = this.state;

    let missingPasswordAndEmailErr = errors.password && errors.email ? "Email and Password is Required" : "";
    let incorrectPasswordOrEmailErr = errors.passwordincorrect || errors.emailnotfound ? "Email or Password is Incorrect" : "";

    let loginInputs = this.state.isLoading ?
      <Loader />
      :
      <div className='loginForm'>
        <Link to="/">
          <div className='loginYikYakLogo'>
            <h1><img src='https://cdn.freebiesupply.com/logos/large/2x/yik-yak-logo-black-and-white.png' width='100px' /></h1>
          </div>
        </Link>
        <div className='loginHeading'>
          <h1>Welcome Back</h1>
        </div>
        <div className='loginInputs'>
          <form noValidate onSubmit={this.onSubmit}>
            <div>
              <input
                onChange={this.onChange}
                value={this.state.email}
                error={errors.email}
                id="email"
                type="email"
                placeholder='Email Address'
                className={classnames("loginField", {
                  invalid: errors.email || errors.emailnotfound
                })}
              />
            </div>
            <div>
              <input
                onChange={this.onChange}
                value={this.state.password}
                error={errors.password}
                id="password"
                type="password"
                placeholder='Password'
                className={classnames("loginField", {
                  invalid: errors.password || errors.passwordincorrect
                })}
              />
              {/* <label htmlFor="password">Password</label> */}
              <span className="red-text">
                {missingPasswordAndEmailErr}
                {incorrectPasswordOrEmailErr}
              </span>
            </div>
            <div>
              <button
                className='loginConfirm'
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
          <div className='forgotPassText'>
            <p>Forgot your password?</p>
          </div>
          <div className='signUpCopy'>
            <p>Don't have an account? <Link to="/register">Sign Up.</Link></p>
          </div>
        </div>
      </div>

    return (
      <div className="loginPage">
        {loginInputs}
        <div className='loginGraphic'>
          {/* <h1>place graphic here</h1> */}
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));
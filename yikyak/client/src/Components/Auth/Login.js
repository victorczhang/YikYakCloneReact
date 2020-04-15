import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
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
    this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
  };
  
  render() {
    const { errors } = this.state;
    return (
      <div className="loginPage">
        <div className='loginForm'>
          <Link to="/">
            <div className='loginYikYakLogo'>
              <h1>Yik Yak Logo</h1>
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
                {/* <label htmlFor="email">Email</label> */}
                <span className="red-text">
                  {errors.email}
                  {errors.emailnotfound}
                </span>
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
                  {errors.password}
                  {errors.passwordincorrect}
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
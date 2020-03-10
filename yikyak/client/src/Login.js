import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "./actions/authActions";
import classnames from "classnames";

class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: "",
            password: "",
            errors: {}
        }
    }

    // componentDidMount() {
    //     this.props.handleAuth()
    //     console.log('Mount')
    // }

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
        this.props.loginUser(userData)
    };

    render() {
        const { errors } = this.state;
        return (
            <div className='loginPage'>
                <div className='loginForm'>
                    <div id='yyloginlogo'>
                        <Link to='/'><h1>YikYak Logo</h1></Link>
                    </div>
                    <div className='loginCopy'>
                        <h1>Welcome Back</h1>
                    </div>
                    <div>
                        <form noValidate onSubmit={this.onSubmit}>
                            <input
                                type='email'
                                placeholder='Email Address'
                                className={classnames("", {
                                    invalid: errors.email || errors.emailnotfound
                                })}
                                onChange={this.onChange}
                                value={this.state.email}
                                error={errors.email}
                                id="email" />
                                <span className="red-text">
                                    {errors.email}
                                    {errors.emailnotfound}
                                </span>
                            <br />
                            <input
                                type='password'
                                className={classnames("", {
                                    invalid: errors.password || errors.passwordincorrect
                                })}
                                placeholder='Password'
                                onChange={this.onChange}
                                value={this.state.password}
                                error={errors.password}
                                id='password' />
                                <span className="red-text">
                                    {errors.password}
                                    {errors.passwordincorrect}
                                </span>
                            <p id='forgotPass'>Forgot password?</p>
                            <br />
                            {/* <Link to='/dashboard'><button className='login' type='submit'>Login</button></Link> */}
                            <button className='login' type='submit'>Login</button>
                        </form>
                    </div>
                    <div className='signUpCopy'>
                        <p>Don't have an account? Sign up.</p>
                    </div>
                </div>
                <div className='loginGraphic'>
                    {/* <h1>Nice Graphic</h1> */}
                </div>
            </div>
        )
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
  )(Login);
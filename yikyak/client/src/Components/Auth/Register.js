import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
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
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className='signUpPage'>
        <div className='signUpPageForm'>
          <Link to="/">
            <div className='signUpYikYakLogo'>
              <h1>Y<img src='https://cdn.freebiesupply.com/logos/large/2x/yik-yak-logo-black-and-white.png' width='100px'/></h1>
            </div>
          </Link>
          <div className='signUpHeading'>
            <h1>Sign Up</h1>
          </div>
          <div className='signUpInputs'>
            <form
              noValidate
              onSubmit={this.onSubmit}
            // className='signUpPageForm'
            >
              <div>
                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="text"
                  placeholder='Name'
                  className={classnames("signUpField", {
                    invalid: errors.name
                  })}
                />
                {/* <label htmlFor="name">Name</label> */}
                <span className="red-text">{errors.name}</span>
              </div>
              <div>
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  placeholder='Email Address'
                  className={classnames("signUpField", {
                    invalid: errors.email
                  })}
                />
                {/* <label htmlFor="email">Email</label> */}
                <span className="red-text">{errors.email}</span>
              </div>
              <div>
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  placeholder='Password'
                  className={classnames("signUpField", {
                    invalid: errors.password
                  })}
                />
                {/* <label htmlFor="password">Password</label> */}
                <span className="red-text">{errors.password}</span>
              </div>
              <div>
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  placeholder='Confirm Password'
                  className={classnames("signUpField", {
                    invalid: errors.password2
                  })}
                />
                {/* <label htmlFor="password2">Confirm Password</label> */}
                <span className="red-text">{errors.password2}</span>
              </div>
              <div>
                <button
                  type="submit"
                  className='signUpConfirm'
                >
                  Sign up
                </button>
              </div>
            </form>
            <div className='existingAcctCopy'>
              <p>Already have an account? <Link to="/login">Log in</Link></p>
            </div>
          </div>
        </div>
        <div className='signUpGraphic'>
          {/* <h1>Test</h1> */}
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
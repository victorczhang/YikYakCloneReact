import React, {Component} from 'react';
import './App.css';
import LandingPage from './LandingPage'
// import Header from './Header'
import Login from './Login'
import Dashboard from './Dashboard'
import Signup from './Signup'

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import { Provider } from "react-redux";
import store from "./store";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import PrivateRoute from './Components/private-route/PrivateRoute';


// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  // constructor() {
    // super()
    // this.state = {
    //   isAuth: false,
    // }
  // }

  // handleAuth = () => {
  //   this.setState = {
  //     isAuth: true,
  //   }
  // }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className='App'>
            <Route exact path='/' component={LandingPage} />
            <Route exact path='/login' render={() => <Login handleAuth={this.handleAuth} />} />
            <Route exact path='/signup' render={() => <Signup handleAuth={this.handleAuth} />} />
            <Switch>
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

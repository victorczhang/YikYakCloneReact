import React, { Component } from "react";
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import LandingPage from './Components/LandingPage/LandingPage'
import Register from "./Components/Auth/Register";
import Login from "./Components/Auth/Login";
import PrivateRoute from "./Components/private-route/PrivateRoute";
import Dashboard from "./Components/Dashboard/Dashboard";
import SinglePostView from './Components/Post/SinglePostView'
import Profile from './Components/User/Profile'

import Blog from "./Components/LandingPage/Blog"
import Features from "./Components/LandingPage/Features"
import Jobs from './Components/LandingPage/Jobs'
import Support from './Components/LandingPage/Support'

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

// // Check for token to keep user logged in
// if (localStorage.jwtToken) {
//   // Set auth token header auth
//   const token = localStorage.jwtToken;
//   setAuthToken(token);
//   // Decode token and get user info and exp
//   const decoded = jwt_decode(token);
//   // Set user and isAuthenticated
//   store.dispatch(setCurrentUser(decoded));
// // Check for expired token
//   const currentTime = Date.now() / 1000; // to get in milliseconds
//   if (decoded.exp < currentTime) {
//     // Logout user
//     store.dispatch(logoutUser());
//     // Redirect to login
//     window.location.href = "./login";
//   }
// }

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className='App'>
            <Route exact path='/' component={LandingPage} />
            <Route exact path='/features' component={Features} /> 
            {/* <Route exact path='/blog' component={Blog} />  */}
            <Route exact path='/jobs' component={Jobs} /> 
            {/* <Route exact path='/support' component={Support} />  */}

            <Route exact path='/login' render={() => <Login handleAuth={this.handleAuth} />} />
            <Route exact path='/register' render={() => <Register handleAuth={this.handleAuth} />} />
            <Switch>
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute exact path='/post/:id' component={SinglePostView} />
              <PrivateRoute exact path='/profile' component={Profile} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

import React, {Component} from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import {Link} from 'react-router-dom'

class UserHeader extends Component {
    constructor() {
        super()
        this.state = {
            // new: true,
            // hot: false,
        }
    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    // handleChange = e => {
    //     this.setState({
    //         new: !this.state.new,
    //         hot: !this.state.hot
    //     })
    //     console.log(this.state.new)
    //     console.log(this.state.hot)
    // }

    render() {
        const { user } = this.props.auth;

        return (
            <div className='dashboardHeader'>
                <div className='dashboardLogo'>
                    <Link to='/dashboard'><i className='material-icons md-24'>home</i></Link>
                </div>
                <div className='dashboardFeedSelection'> 
                    {/* <p id='nearby'>Nearby</p>
                    <p id='myHerd'>My Herd</p> */}
                </div>
                <div className='dashboardNewHot'>
                    <div className='newPostToggle'>
                        <input 
                            type='radio' 
                            name='feedOption' 
                            value='new'
                            id='newPostToggle' 
                            checked={this.props.new}
                            // defaultChecked={true}
                            onChange={this.props.handleChange}
                        />
                        <label htmlFor='newPostToggle'>New</label>
                    </div>
                    <div className='hotPostToggle'>
                        <input 
                            type='radio' 
                            name='feedOption'
                            value='hot'
                            id='hotPostToggle' 
                            checked={this.props.hot}
                            onChange={this.props.handleChange}
                        />
                        <label htmlFor='hotPostToggle'>Hot</label>
                    </div>
                </div>
                <div className='dashboardUserPref'>
                    <Link to='/profile'><button className='userProfile'>Hey there, <b>{user.name.split(" ")[0]}</b></button></Link>
                    <button className='userLogout' onClick={this.onLogoutClick}>Log Out</button>
                </div>
            </div>
        )
    }
}

UserHeader.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
  
const mapStateToProps = state => ({
    auth: state.auth
});
  
export default connect(
    mapStateToProps,
    { logoutUser }
)(UserHeader);

// export default UserHeader
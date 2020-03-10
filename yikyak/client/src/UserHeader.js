import React, {Component} from 'react'
// import {Link} from 'react-router-dom'

class UserHeader extends Component {
    constructor() {
        super()
        this.state = {

        }
    }
    render() {
        return (
            <div className='dashboardHeader'>
                <div className='dashboardLogo'>
                    <p>YikYak Logo</p>
                </div>
                <div className='dashboardFeedSelection'> 
                    <p id='nearby'>Nearby</p>
                    <p id='myHerd'>My Herd</p>
                </div>
                <div className='dashboardNewHot'>
                    <div className='newPostToggle'>
                        <input type='radio' name='feedOption' value='new' id='newPostToggle' />
                        <label for='newPostToggle'>New</label>
                    </div>
                    <div className='hotPostToggle'>
                        <input type='radio' name='feedOption' value='hot' id='hotPostToggle' checked />
                        <label for='hotPostToggle'>Hot</label>
                    </div>
                    {/* <input type='radio' name='feedOption' value='new' id='newPostToggle' />
                    <label for='newPostToggle'>New</label> */}
                    {/* <input type='radio' name='feedOption' value='hot' id='hotPostToggle' />
                    <label for='hotPostToggle'>Hot</label> */}
                </div>
                <div className='dashboardUserPref'>
                    <p id='userNotifications'>Notifications</p>
                    <button id='userLogout' onClick={this.props.onLogoutClick}>Log Out</button>
                </div>
            </div>
        )
    }
}

export default UserHeader
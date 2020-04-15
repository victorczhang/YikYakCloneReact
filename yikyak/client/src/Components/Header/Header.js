import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Header extends Component {
    constructor() {
        super()
        this.state = {

        }
    }

    render() {
        return (
            <div className='header'>
                <div className='left-nav'>
                    <div className='logo'>
                        <ul>
                            <li>Yik Yak Logo</li>
                        </ul>
                    </div>
                    <div className='navbar'>
                        <ul>
                            <li>Home</li>
                            <li>Features</li>
                            <li>Jobs</li>
                            <li>Blog</li>
                            <li>Support</li>
                        </ul>
                    </div>
                </div>
                <div className='right-nav'>
                    <div className='login'>
                        <ul>
                            <Link to='/login'><li><button className='loginButton'>Login</button></li></Link>
                            <Link to='/register'><li><button className='signUpButton'>Sign Up</button></li></Link>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header
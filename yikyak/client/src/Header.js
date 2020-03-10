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
                <div className='logo'>
                    <h1>YikYak Logo</h1>
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
                {/* <div class='social'>
                    <ul>
                        <li>Twitter</li>
                        <li>Facebook</li>
                        <li>Instagram</li>
                    </ul>
                </div> */}
                <div className='login'>
                    <ul>
                        <Link to='/login'><li><button className='loginButton'>Login</button></li></Link>
                        <Link to='/signup'><li><button className='signUpButton'>Sign Up</button></li></Link>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Header
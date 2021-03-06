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
                            <li><img src='https://cdn.freebiesupply.com/logos/large/2x/yik-yak-logo-black-and-white.png' width='100px'></img></li>
                        </ul>
                    </div>
                    <div className='navbar'>
                        <ul>
                            <Link to='/'><li>Home</li></Link>
                            <Link to='/features'><li>Features</li></Link>
                            <Link to='/jobs'><li>Jobs</li></Link>
                            {/* <Link to='/blog'><li>Blog</li></Link>
                            <Link to='/support'><li>Support</li></Link> */}
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
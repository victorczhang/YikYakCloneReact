import React, {Component} from 'react'
// import Post from '../Post/Post'
import Header from '../Header/Header'

class LandingPage extends Component {
    constructor() {
        super()
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <Header />
                <div className='landingPage'>
                    <div>
                        <div className='landingPageCopy'>
                            <p>Get a life feed of what</p>
                            <p>everyone's saying around you</p>
                        </div>
                        <div className='landingPagePhone'>
                            <form>
                                <label>
                                    <input id='landingPhone' type='tel' placeholder='Enter cell # (678) 999-8212' />
                                </label>
                                <button id='submitPhone'>Submit</button>
                            </form>
                        </div>
                    </div>
                    <div>
                        <h1>VIDEO GOES HERE</h1>
                    </div>
                </div>
                {/* <div>
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                </div> */}
            </div>
        )
    }
}

export default LandingPage
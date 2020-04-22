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
                        <a><img src='https://web.archive.org/web/20151216174926im_/http://yikyakwebsite.s3.amazonaws.com/wp-content/uploads/sites/2/sites/2/2015/04/XEidbtAxLe4Fj6BPtQIAoeOLFNtqMWhGk0ufYr4U30Q.jpg' width='600px'></img></a>
                    </div>
                </div>
            </div>
        )
    }
}

export default LandingPage
import React, { Component } from 'react'
import Header from '../Header/Header'
import { Link } from 'react-router-dom'

class Features extends Component {
    constructor() {
        super()
        this.state = {

        }
    }

    render() {
        return (
            <div className='featuresPage'>
                <div>
                    <Header />
                </div>
                <div className='featuresLanding'>
                    <div className='featuresLandingCopy'>
                        <h1>Get a live feed of what people are saying around you.</h1>
                        {/* <h1>people are saying around you.</h1> */}
                    </div>
                    <div>
                        <div className='featuresImgContainer'>
                            <img src='https://web.archive.org/web/20151210202710im_/http://www.yikyakapp.com/wp-content/themes/yik-yak-web-general/img/phones/timeline@2x.png'
                            className='landingImg' />
                        </div>
                        {/* <div className='featuresImgContainer'>
                            <img src='https://web.archive.org/web/20151210202710im_/http://www.yikyakapp.com/wp-content/themes/yik-yak-web-general/img/phones/detail-header@2x.png' />
                        </div> */}
                    </div>
                </div>
                <div className='featuresChatSection'>
                    <div className='featuresImgCrop'>
                        <img 
                        src='https://web.archive.org/web/20151210202710im_/http://www.yikyakapp.com/wp-content/themes/yik-yak-web-general/img/phones/compose@2x.png' 
                        className='iPhoneZoom'
                        />
                    </div>
                    <div className='featuresChatBubble'>
                        <div className='featuresImgContainer'>
                            <img src='https://web.archive.org/web/20151210202710im_/http://www.yikyakapp.com/wp-content/themes/yik-yak-web-general/img/features/features-1-chatbubble-01.svg' width='200px' />
                        </div>
                        <div>
                            <h1>Join the conversation.</h1>
                            <p>Share your thoughts with people around you.</p>
                        </div>
                    </div>
                </div>
                <div className='featuresYakarma'>
                    <div className='featuresYakarmaCopy'>
                        <h1>Earn Yakarma points</h1>
                        <div className='featuresYakarmaSubcopy'>
                            <p>Get rewarded for posting awesome Yaks.</p>
                        </div>
                        <div className='featuresYakarmaPoints'>
                            <h2>1337</h2>
                            <h3>Yakarma</h3>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Features
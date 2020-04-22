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
            <div>
                <div>
                    <Header />
                </div>
                <div>
                    <div>
                        <h1>Get a Get a live feed of what people are saying around you.</h1>
                    </div>
                    <div>
                        <img src='https://web.archive.org/web/20151210202710im_/http://www.yikyakapp.com/wp-content/themes/yik-yak-web-general/img/phones/timeline@2x.png' />
                        <img src='https://web.archive.org/web/20151210202710im_/http://www.yikyakapp.com/wp-content/themes/yik-yak-web-general/img/phones/detail-header@2x.png' />
                    </div>
                </div>
                <div>
                    <div>
                        <img src='https://web.archive.org/web/20151210202710im_/http://www.yikyakapp.com/wp-content/themes/yik-yak-web-general/img/phones/compose@2x.png' />
                    </div>
                    <div>
                        <div><img src='https://web.archive.org/web/20151210202710im_/http://www.yikyakapp.com/wp-content/themes/yik-yak-web-general/img/features/features-1-chatbubble-01.svg' /></div>
                        <h1>Join the conversation.</h1>
                        <p>Share your thoughts with people around you.</p>
                    </div>
                </div>
                <div>
                    <h1>Earn Yakarma Points</h1>
                </div>
            </div>
        )
    }
}

export default Features
import React, { Component } from 'react'
import Header from '../Header/Header'
import { Link } from 'react-router-dom'

class Jobs extends Component {
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
                <div className='jobsLanding'>
                    <div className='jobsLandingCopyContainer'>
                        <p className='jobsLandingCopy'>Join the Herd</p>
                    </div>
                    <div className='viewPositionsContainer'>
                        <button className='viewPositions'>View Open Positions</button>
                    </div>
                </div>
                <div className='companyDesc'>
                    <div>
                        <h1>We are YikYak</h1>
                    </div>
                    <div className='companyCopy'>
                        <p>At Yik Yak, we're building the most authentic way for people to connect with their communities and find their herds. Proudly based in Atlanta, our tight-knit team works hard to foster rich communities, build the best mobile experiences, and push the boundaries on what it means to be a social platform.</p>
                    </div>
                    <div>
                        <h1>Photo 1</h1>
                        <h1>Photo 2</h1>
                        <h1>Photo 3</h1>
                    </div>
                </div>
                <div className='missionStatement'>
                    <div>
                        <h1>Change the way the world communicates</h1>
                    </div>
                    <div className='missionStatementDesc'>
                        <p>We are hungry, we move fast, and we always put the herd first. We're looking for the best talent to join us as we transform the way we communicate locally. If you're interested in joining the herd that TechCrunch awarded “Fastest Rising Startup” in 2015, check out some of our open positions below!</p>
                    </div>
                </div>
                <div className='yakJobGraphic'>
                    <img src='https://web.archive.org/web/20151212071920im_/http://s3.amazonaws.com/yikyakwebsite/jobs_illo_x2.png' />
                </div>
                <div>
                    <div><h1>Benefits</h1></div>
                    <div>
                        <div>
                            <img src='https://web.archive.org/web/20151212071920im_/http://s3.amazonaws.com/yikyakwebsite/icons/job_cons_hotlanta.svg' />
                        </div>
                        <div>
                            <img src='https://web.archive.org/web/20151212071920im_/http://s3.amazonaws.com/yikyakwebsite/icons/job_cons_salary.svg' />
                        </div>
                        <div>
                            <img src='https://web.archive.org/web/20151212071920im_/http://s3.amazonaws.com/yikyakwebsite/icons/job_cons_snacks.svg' />
                        </div>
                        <div>
                            <img src='https://web.archive.org/web/20151212071920im_/http://s3.amazonaws.com/yikyakwebsite/icons/job_cons_vacay.svg' />
                        </div>
                        <div>
                            <img src='https://web.archive.org/web/20151212071920im_/http://s3.amazonaws.com/yikyakwebsite/icons/job_cons_benefits.svg' />
                        </div>
                        <div>
                            <img src='https://web.archive.org/web/20151212071920im_/http://s3.amazonaws.com/yikyakwebsite/icons/job_cons_benefits.svg' />
                        </div>
                    </div>
                </div>
                <div>
                    <h1>Open Job 1</h1>
                </div>
            </div>
        )
    }
}

export default Jobs
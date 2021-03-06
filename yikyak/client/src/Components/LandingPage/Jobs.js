import React, { Component } from 'react'
import Header from '../Header/Header'
import { Link } from 'react-router-dom'

class Jobs extends Component {
    constructor() {
        super()
        this.myRef = React.createRef()
        this.state = {

        }
    }

    // scrollToMyRef = () => {
    //     window.scrollTo(0, this.myRef.current.offsetTop)
    // }

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
                        <button 
                        onClick={() => {this.myRef.current.scrollIntoView({behavior: 'smooth'})}}
                        className='viewPositions'>View Open Positions</button>
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
                        <img src='https://pbs.twimg.com/media/CRNxrOYWsAElD1n.png' />
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
                    <img 
                    className='yakImg'
                    src='https://web.archive.org/web/20151212071920im_/http://s3.amazonaws.com/yikyakwebsite/jobs_illo_x2.png' 
                    />
                </div>
                <div className='benefitsSection'>
                    <div className='benefitsHeading'><h1>Benefits</h1></div>
                    <div className='benefitsContainer'>
                        <div className='benefitsItem'>
                            <img className='benefitsGraphic' src='https://web.archive.org/web/20151212071920im_/http://s3.amazonaws.com/yikyakwebsite/icons/job_cons_hotlanta.svg' />
                            <p className='benefitsCopy'>Work at Atlanta's hottest company</p>
                        </div>
                        <div className='benefitsItem'>
                            <img className='benefitsGraphic' src='https://web.archive.org/web/20151212071920im_/http://s3.amazonaws.com/yikyakwebsite/icons/job_cons_salary.svg' />
                            <p className='benefitsCopy'>Competitive Salary</p>
                        </div>
                        <div className='benefitsItem'>
                            <img className='benefitsGraphic' src='https://web.archive.org/web/20151212071920im_/http://s3.amazonaws.com/yikyakwebsite/icons/job_cons_snacks.svg' />
                            <p className='benefitsCopy'>Catered lunch daily and unlimited snacks</p>
                        </div>
                        <div className='benefitsItem'>
                            <img className='benefitsGraphic' src='https://web.archive.org/web/20151212071920im_/http://s3.amazonaws.com/yikyakwebsite/icons/job_cons_vacay.svg' />
                            <p className='benefitsCopy'>Flexible vacation and sick days</p>
                        </div>
                        <div className='benefitsItem'>
                            <img className='benefitsGraphic' src='https://web.archive.org/web/20151212071920im_/http://s3.amazonaws.com/yikyakwebsite/icons/job_cons_benefits.svg' />
                            <p className='benefitsCopy'>Full coverage for medical, dental, and vision for employees and their families</p>
                        </div>
                        <div className='benefitsItem'>
                            <img className='benefitsGraphic' src='https://web.archive.org/web/20150713091747im_/http://s3.amazonaws.com/yikyakwebsite/icons/job_cons_equipment.svg' />
                            <p className='benefitsCopy'>Access to whatever tools and equipment you need</p>
                        </div>
                    </div>
                </div>
                <div className='atlantaBlurb'>
                    <div className='atlantaHeading'>
                        <h2>Atlanta Represent</h2>
                    </div>
                    <div className='atlantaDesc'>
                        <p>Silicon Valley isn’t the only incubator for startups. Yik Yak proudly leads the thriving startup scene here in Atlanta. Home to world-renowned Fortune 500 companies, southern charm, and the best chicken and waffles, Atlanta is a hot spot for music, art, and hundreds of top restaurants. And you can’t beat that beautiful skyline.</p>
                    </div>
                </div>
                <div 
                    ref={this.myRef}
                    className='openPositions'>
                    
                    <div className='jobContainer' >
                        <div className='openPositionsHeader'>
                            <h1>Open Positions</h1>
                        </div>


                        <div class='jobSection'>
                            <div>
                                <h2>Campus Representative</h2>
                            </div>

                            <div className='jobPosting'>
                                <div>
                                    <a href='https://cdn.britannica.com/40/188540-050-9AC748DE/Yak-Himalayas-Nepal.jpg'>
                                        <p>USA Campus Representative</p>
                                    </a>
                                    {/* <h1>Job Desc.</h1> */}
                                </div>
                                <div>
                                    <p>Universities and Colleges inside the USA</p>
                                </div>
                            </div>

                            <div className='jobPosting'>
                                <div>
                                    <p>International Campus Representative</p>
                                    {/* <h1>Job Desc.</h1> */}
                                </div>
                                <div>
                                    <p>Universities and Colleges outside the USA</p>
                                </div>
                            </div>
                        </div>

                        <div class='jobSection'>
                            <div>
                                <h2>Design</h2>
                            </div>

                            <div className='jobPosting'>
                                <div>
                                    <p>UX Designer</p>
                                    {/* <h1>Job Desc.</h1> */}
                                </div>
                                <div>
                                    <p>Atlanta, GA</p>
                                </div>
                            </div>
                            <div className='jobPosting'>
                                <div>
                                    <a href='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSt6d9xgIYpc8Jjw0wMHzjfpleg7MMs64dxAHOgpdLO40sfKKyV&usqp=CAU'>
                                        <p>Lead, User Experience and Design</p>
                                    </a>
                                    {/* <h1>Job Desc.</h1> */}
                                </div>
                                <div>
                                    <p>Atlanta, GA</p>
                                </div>
                            </div>
                            <div className='jobPosting'>
                                <div>
                                    <a href='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQLrK_7nLOYtOCY_Voxs2DeoJlCuGlqQMIvwDHwtu6cAJVR0fsg&usqp=CAU'>
                                        <p>Product Designer</p>
                                    </a>
                                    {/* <h1>Job Desc.</h1> */}
                                </div>
                                <div>
                                    <p>Atlanta, GA</p>
                                </div>
                            </div>
                        </div>

                        <div class='jobSection'>
                            <div>
                                <h2>Engineering</h2>
                            </div>

                            <div className='jobPosting'>
                                <div>
                                    <a href='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTcHAeFl98VEm4M6NFDk9ninSuEHuV25eBShPG-dLlq191y_D6q&usqp=CAU'>
                                        <p>Android Developer</p>
                                    </a>
                                    {/* <h1>Job Desc.</h1> */}
                                </div>
                                <div>
                                    <p>San Francisco, CA</p>
                                </div>
                            </div>
                            <div className='jobPosting'>
                                <div>
                                    <p>Full Stack Web Engineer</p>
                                    {/* <h1>Job Desc.</h1> */}
                                </div>
                                <div>
                                    <p>San Francisco, CA</p>
                                </div>
                            </div>
                            <div className='jobPosting'>
                                <div>
                                    <p>iOS Engineer</p>
                                    {/* <h1>Job Desc.</h1> */}
                                </div>
                                <div>
                                    <p>San Francisco, CA</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='jobFooter'>
                        <h2>We're always looking to add to our herd so stay tuned for more postings!</h2>
                    </div>
                </div>
            </div>
        )
    }
}

export default Jobs
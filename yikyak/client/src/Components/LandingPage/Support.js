import React, {Component} from 'react'
import Header from '../Header/Header'
import {Link} from 'react-router-dom'

class Support extends Component {
    constructor() {
        super()
        this.state = {

        }
    }

    render() {
        return (
           <div>
               <Header />
               <h1>Support</h1>
           </div>
        )
    }
}

export default Support
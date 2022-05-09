import React, { Component } from 'react'
import PropTypes from "prop-types";
import { Link } from 'react-router-dom'

import { TailSpin } from 'react-loader-spinner'

class Loader extends Component {
    constructor() {
        super()
        this.state = {
        }
    }


    render() {
        return (
            <div className='loader'>
                <TailSpin
                    height="150"
                    width="150"
                    color='#30DBBD'
                    ariaLabel='loading'
                />
            </div>
        )
    }
}


export default Loader
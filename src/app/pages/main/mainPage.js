import React, { Component } from 'react'
import { Link } from 'react-router'

export default class Layout extends Component {
  render() {

    return <div id="main" >Main Page!!
            <div><Link to="/login">Link</Link></div>
         </div>
  }
}

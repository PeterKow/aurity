import React, { Component } from 'react';
import Navbar from 'containers/navbar/navbar.js'

export default class Layout extends Component {
  render() {
    return (
      <div>

        <div className="container">
          <Navbar/>
          {/* this will render the child routes */}
          {this.props.children}
        </div>
      </div>
    )
  }
}

Layout.propTypes = {
  children: React.PropTypes.node.isRequired,
}

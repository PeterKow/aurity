import React, { Component } from 'react';

import Navbar from 'containers/navbar/navbar.js'


const List = require('material-ui/lib/lists/list');
const ListItem = require('material-ui/lib/lists/list-item');
const ListDivider = require('material-ui/lib/lists/list-divider');
const Avatar = require('material-ui/lib/avatar');

//required by material-ui. Supposed to be removed, as soon as react v1.0 is published
let injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();


export default class Layout extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <Navbar/>
          {this.props.children}
        </div>
      </div>
    )
  }
}

Layout.propTypes = {
  children: React.PropTypes.node.isRequired,
}

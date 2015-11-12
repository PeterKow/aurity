/**
 * Created by Peter on 30/08/15.
 */
import React, { Component, PropTypes } from 'react';

export default class Logo extends Component {
  render() {
    return (
      <div>
        <h1 className="app-logo">{this.props.appName}</h1>
      </div>
    );
  }
}

Logo.propTypes = {
  appName :  PropTypes.string.isRequired
}

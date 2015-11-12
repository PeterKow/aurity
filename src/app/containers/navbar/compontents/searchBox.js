/**
 * Created by Peter on 30/08/15.
 */
import React, { Component, PropTypes } from 'react';
import store from 'utils/store.js'
import { startFetchMiniArticles } from 'containers/articles/articleGroup.actions.js'

const TextField = require('material-ui/lib/text-field');
const IconOptions= require('material-ui/lib/svg-icons/action/settings');
const IconRefresh= require('material-ui/lib/svg-icons/navigation/refresh');
const IconButton = require('material-ui/lib/icon-button');
// const Dialog = require('material-ui/lib/dialog');


export default class SearchBox extends Component {
  render() {
    return (
      <div className="search-bar">
      	<label>Current search:</label>
        <TextField
          hintText="Enter your search fraze"
          defaultValue="Jobs + React" />
        <IconButton className="icon-refresh" tooltip="Refresh list">
        	<IconRefresh onClick={() => store.dispatch(startFetchMiniArticles())}/>
        </IconButton>
        <IconButton className="icon-options" tooltip="Modify your search queries">
        	<IconOptions/>
        </IconButton>
      </div>
    );
  }
}

SearchBox.propTypes = {
  labelText :  PropTypes.string.isRequired
}

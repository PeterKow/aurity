import React, { Component } from 'react'
import { Link } from 'react-router'
import store from 'utils/store.js'
import { logout } from 'business/user/user.group.actions.js'
import Logo from '../../containers/utils/logo.js'
import SearchBox from './compontents/searchBox.js'
import { startFetchMiniArticles } from 'containers/articles/articleGroup.actions.js'


const Toolbar = require('material-ui/lib/toolbar/toolbar');
const ToolbarGroup = require('material-ui/lib/toolbar/toolbar-group');
const IconMenu = require('material-ui/lib/menus/icon-menu');
const MenuItem = require('material-ui/lib/menus/menu-item');
const IconButton = require('material-ui/lib/icon-button');
const IconDropdown= require('material-ui/lib/svg-icons/navigation/menu');



var iconButtonElement = <IconButton iconClassName="muidocs-icon-custom-github" tooltip="GitHub"/>;

export default class Navbar extends Component {
  render() {
    return (
       <Toolbar className="top-bar" style={{backgroundColor : "#fff"}}>
        <ToolbarGroup key={0} float="left">
          <Logo appName = "Twitter Sherlock" /> 
        </ToolbarGroup>
        <ToolbarGroup key={1} float="left">
          <SearchBox labelText="Current search:" />
        </ToolbarGroup>
        <ToolbarGroup key={2} float="right">
            <IconMenu className="menu-icon" iconButtonElement={<IconDropdown/>}>
            <MenuItem primaryText="Settings" />
            <MenuItem primaryText="Sign out" onClick={() => store.dispatch(logout())} />
          </IconMenu>
        </ToolbarGroup>
      </Toolbar>
      )
  }
}

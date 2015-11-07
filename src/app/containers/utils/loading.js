import React, { Component } from 'react'

import fetchService from 'utils/fetch'
import history from 'utils/history'
import store from 'utils/store'
import { loginSuccess } from 'business/user/user.group.actions'

export default class Loader extends Component {

  componentWillMount() {
    fetchService('/profile')
      .then(res => {
        console.log('me ', res)
        store.dispatch(loginSuccess(res))
        // todo change directory
        // todo save to local storage
        //history.replaceState(null, '/')
      })
      .catch(res => {
        console.log('me error', res)
        history.replaceState(null, '/login')
      })
  }

  render() {
    return (
      <div style={{ margin: '0 auto', width: 100, padding: '50px 0 50px'}}>
        <i style={{ fontSize: 70}} className="fa fa-spinner fa-spin"></i>
        <h4>Loading...</h4>
      </div>)
  }
}

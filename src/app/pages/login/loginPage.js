import React, { Component } from 'react'
import { connect } from 'react-redux'
import { authWithTwitter } from 'business/user/user.group.actions.js'
import Logo from '../../containers/utils/logo.js'


class Login extends Component {
  render() {
    // Todo: create proper button
    const { dispatch } = this.props

    return (
      <div className="login-page-wrap">
        <Logo appName="Twitter Sherlock" />
        <h2 className="sub-title">Get more valuable tweets, based on your interests. Daily.</h2>

        <div className="btn-group login-btn-wrap">
          <a href="/auth/twitter" className="btn btn-info"><i className="fa fa-twitter"></i> Sign in with Twitter</a>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
}

function select() {
  return {}
}

export default connect(select)(Login)

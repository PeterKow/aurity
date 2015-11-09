import React, { Component } from 'react'
import { connect } from 'react-redux'

const positionAbsolute = {
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  margin: 'auto',
  padding: 5,
  maxWidth: 500,
  maxHeight: 300,
}

const logo = {
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  padding: '10px 0 10px 0',
}

class Login extends Component {
  render() {
    return (
      <div style={positionAbsolute}>
        <img src="/images/aurity_logo_v32_big.png" style={logo}/>
        <h1 style={{textAlign: 'center'}}>Login required</h1>
        <h4 style={{textAlign: 'center'}}>To search on twitter you need to sign in</h4>

        <div className="btn-group"
             style={{ width: '100%', cursor: 'pointer', marginLeft: 0 }}>
          <a href="/auth/twitter" className="btn btn-info disabled col-xs-1" style={{ height: 37}}><i className="fa fa-twitter" style={{ width: 16, height: 20}}></i></a>
          <a href="/auth/twitter" className="btn btn-info col-xs-11" style={{ height: 37, fontSize: 16}}> Sign in with Twitter</a>
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

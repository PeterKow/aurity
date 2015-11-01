import React, { Component } from 'react'
import { connect } from 'react-redux'
import { authWithTwitter } from 'business/user/user.group.actions.js'

class Login extends Component {

  render() {
    // Todo: create proper button
    const { dispatch } = this.props

    return (
      <div style={positionAbsolute}>
        <img src="/images/aurity_logo_v32_big.png" style={logo}/>
        <h1 style={{textAlign: 'center'}}>Login required</h1>
        <h4 style={{textAlign: 'center'}}>To search on twitter you need to sign in</h4>

        <div className="btn-group"
             style={ { width: '100%', cursor: 'pointer', marginLeft: 0 } }
             onClick={ () => { dispatch(authWithTwitter()) } }>
          <a className='btn btn-info disabled col-xs-1' style={{ height: 37}}><i className="fa fa-twitter" style={{ width:16, height:20}}></i></a>
          <a className='btn btn-info col-xs-11' style={{ height: 37, fontSize: 16}}> Sign in with Twitter</a>
        </div>
      </div>
    )
  }

}

function select(state){
  return {}
}

export default connect(select)(Login)

const positionAbsolute = {
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  margin: 'auto',
  padding: 5,
  maxWidth: 500,
  maxHeight: 300
}

const logo = {
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  padding: '10px 0 10px 0'
}

const twitterButton = {
  //background: '#4099FF',
  background: "url('https://si0.twimg.com/images/dev/cms/intents/bird/bird_blue/bird_16_blue.png') no-repeat 2px 1px #4099FF",
  border: '1px solid #cccccc',
  borderRadius: 3,
  MozBorderRadius: 3,
  WebkitBorderRadius: 3,
  paddingLeft: 22,
  paddingRight: 4,
  paddingTop: 2,
  fontSize: '0.9em',
  color: 'white'
}
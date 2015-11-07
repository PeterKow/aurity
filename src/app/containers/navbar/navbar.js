import React, { Component } from 'react'
import { Link } from 'react-router'
import store from 'utils/store.js'
import { logout } from 'business/user/user.group.actions.js'
//import Twit from 'twit'

import Twit from 'node-twitter'

export default class Navbar extends Component {
  twitter(){
    //accessToken: "1627149078-W11Zxz9Kffwf7sskctuhChgNKPxMzzavXarkM4k"
    //accessTokenSecret: "dfuTWCuExC145nbQQYNCmKPNlapxG6LFh7FKQPsoS0nwD"

    console.log('starttwtt')
    var T = new Twit.SearchClient({
      consumer_key:         '1627149078-W11Zxz9Kffwf7sskctuhChgNKPxMzzavXarkM4k'
      , consumer_secret:      'dfuTWCuExC145nbQQYNCmKPNlapxG6LFh7FKQPsoS0nwD'
      , access_token:         'QFX2VuvqJDIwAorheGUyafkvW'
      , access_token_secret:  'lDtbSxgEtBVe5wyQYdY2zOU4Y77ZtlocSXaH2ex5gbTR28sKs9'
    })

    T.search({'q': 'node.js'}, function(error, result) {
      if (error)
      {
        console.log('Error: ' + (error.code ? error.code + ' ' + error.message : error.message));
      }

      if (result)
      {
        console.log(result);
      }
    });


    //T.get('search/tweets', { q: 'banana', count: 100 }, function(err, data, response) {
    //  console.log('err',err)
    //  console.log('data',data)
    //})
  }

  render() {
    return (<nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="/">Aurity</a>
        </div>
        <div id="navbar" className="navbar-collapse collapse">
          <ul className="nav navbar-nav">
            <li className="active"><a href="/">Home</a></li>
            <li onClick={this.twitter}><a>Search</a></li>
            <li><Link to="/login">Link</Link></li>
            <li onClick={()=> store.dispatch(logout())}><a href="">Logout</a></li>
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span></a>
              <ul className="dropdown-menu">
                <li><a href="#">Action</a></li>
                <li><a href="#">Another action</a></li>
                <li><a href="#">Something else here</a></li>
                <li role="separator" className="divider"></li>
                <li className="dropdown-header">Nav header</li>
                <li><a href="#">Separated link</a></li>
                <li><a href="#">One more separated link</a></li>
              </ul>
            </li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li className="active"><a href="./">Default <span className="sr-only">(current)</span></a></li>
            <li><a href="../navbar-fixed-top/">Fixed top</a></li>
          </ul>
        </div>
      </div>
    </nav>)
  }
}

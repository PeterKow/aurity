import React from 'react';

// import { Router, DefaultRoute, Route, NotFoundRoute, Redirect } from 'react-router';replaceState
import { Router, Route } from 'react-router';

import Layout from './pages/main/layout.js'
import MainPage from './pages/main/mainPage.js'
import Login from './pages/login/loginPage.js'
import Loader from 'containers/utils/loading'

// function requireAuth(nextState, replaceState) {
 // TODO add new validation
  // if (!auth.isLoggedIn()) {
  //  replaceState({nextPathname: nextState.location.pathname}, '/login')
  // }
// }

function redirectHome(replaceState) {
  replaceState({}, '/')
}

function renderRoutes(history) {
  return (
    <Router history={history}>
      <Route component={ Layout }>
        <Route path="/" component={ MainPage} />
      </Route>
      <Route path="login" component={ Login } />
      <Route path="authMe" component={ Loader } />
      <Route path="*" onEnter={redirectHome}/>

    </Router>
  )
}

export default renderRoutes;


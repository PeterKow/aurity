import React from 'react';

// import { Router, DefaultRoute, Route, NotFoundRoute, Redirect } from 'react-router';
import { Router, Route } from 'react-router';

import Layout from './pages/main/layout.js'
import MainPage from './pages/main/mainPage.js'
// import MainPage from './pages/mainPage/mainPage.js'
// import NotFoundRouteView from './pages/utils/notFoundRoute.js'
// import SearchArticles from './pages/mainSearchPage/searchArticles.js'
import Login from './pages/login/loginPage.js'
import Loader from 'containers/utils/loading'
// import ProfilePage from './pages/profilePage/profilePage.js'
// Browser history
// TODO; decide history url style
// import createHashHistory from 'history/lib/createHashHistory';


//import auth from 'business/firebase/firebaseAuth.js'

function requireAuth(nextState, replaceState) {
 // TODO add new validation
  //if (!auth.isLoggedIn()) {
  //  replaceState({nextPathname: nextState.location.pathname}, '/login')
  //}
}

function redirectHome(nextState, replaceState) {
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

// <Router history={historyNew}>
//  <Route component={ Layout }>
//    <Route path="/" component={ MainPage } onEnter={requireAuth}/>
//    <Route path="profileme" component={ ProfilePage } />
//  </Route>
//
//  <Route path="login" component={ Login } />
//  <Route path="search" component={ SearchArticles }/>
//  <Route path="*" component={ NotFoundRouteView }/>
// </Router>

export default renderRoutes;


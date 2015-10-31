import React from 'react';

import { Router, DefaultRoute, Route, NotFoundRoute, Redirect } from 'react-router';

import Layout from './pages/main/layout.js'
import MainPage from './pages/main/mainPage.js'
//import MainPage from './pages/mainPage/mainPage.js'
//import NotFoundRouteView from './pages/utils/notFoundRoute.js'
//import SearchArticles from './pages/mainSearchPage/searchArticles.js'
import Login from './pages/login/loginPage.js'
//import ProfilePage from './pages/profilePage/profilePage.js'
// Browser history
// TODO; decide history url style
import createHistory from 'history/lib/createBrowserHistory';
import createHashHistory from 'history/lib/createHashHistory';

function requireAuth(nextState, replaceState) {
  if (!localStorage.token)
    replaceState({ nextPathname: nextState.location.pathname }, '/login')
}

function renderRoutes (history) {
  var historyNew = createHistory({
    queryKey: false
  });
  return (
    <Router history={history}>
      <Route component={ Layout }>
        <Route path="/" component={ MainPage } />
      </Route>
      <Route path="login" component={ Login } />

    </Router>
  )
}

//<Router history={historyNew}>
//  <Route component={ Layout }>
//    <Route path="/" component={ MainPage } onEnter={requireAuth}/>
//    <Route path="profileme" component={ ProfilePage } />
//  </Route>
//
//  <Route path="login" component={ Login } />
//  <Route path="search" component={ SearchArticles }/>
//  <Route path="*" component={ NotFoundRouteView }/>
//</Router>

export default renderRoutes;


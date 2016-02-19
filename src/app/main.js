/* global __DEV__ */
require('./main.css')
require('font-awesome-webpack')

import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
// import { IntlProvider } from 'react-intl'
import DevTools from './utils/devTools.js'
import renderRoutes from './routes.js'
import history from 'utils/history.js'
import store from 'utils/store.js'

function getRootChildren(props) {
  // const intlData = {
  //  locale: props.application.locale,
  //  //messages: i18n[props.application.locale]
  // }

  // TODO IntlProvider doesnt work with 0.14
  // <IntlProvider key="intl" {...intlData}>
  // {renderRoutes.bind(null, props.history)}
  // </IntlProvider>

  const rootChildren = [
    <div key="intl">{renderRoutes.bind(null, props.history)()}</div>,
  ]
  if (__DEV__) {
    rootChildren.push(
      <DevTools key="dev-tools"/>
    )
  }
  return rootChildren
}

@connect(({ application }) => ({ application }))
class Root extends React.Component {
  static propTypes = {
    application: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div>{getRootChildren(this.props)}</div>
    )
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Root history={history} />
  </Provider>
  , document.getElementById('app'))

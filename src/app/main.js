require('./main.css')
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import Layout from './containers/layouts/layout.js'

ReactDOM.render(
  <Layout/>
  , document.getElementById('app'))
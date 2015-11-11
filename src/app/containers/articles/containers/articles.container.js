/**
 * Created by Peter on 30/08/15.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { completeMiniArticle } from '../article.actions.js';
import MiniArticleList from '../components/miniArticleList.js';

export default class Articles extends Component {

  render() {
    // Injected by connect() call:
    const { dispatch, miniArticles, isFetching } = this.props;

    if (isFetching) {
      return loader()
    }

    return (
        <MiniArticleList
          miniarticles={miniArticles}
          onMiniArticleClick={index =>dispatch(completeMiniArticle(index))} />
    );

    function loader() {
      return (
        <div className="preloader-wrap">
          <i style={{ fontSize: 70}} className="fa fa-spinner fa-spin"></i>
          <h4>Loading...</h4>
        </div>)
    }
  }
}

Articles.propTypes = {
  miniArticles: React.PropTypes.array.isRequired,
  isFetching: React.PropTypes.bool.isRequired,
  dispatch: React.PropTypes.func,
}

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select() {
  return {};
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(Articles);

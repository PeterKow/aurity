/**
 * Created by Peter on 30/08/15.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { completeMiniArticle } from '../article.actions.js';
import MiniArticleList from '../components/miniArticleList.js';
import Firebase from 'firebase'
var myDataRef = new Firebase('https://fiery-inferno-5861.firebaseio.com/tweets');

export default class Articles extends Component {

  handleClick = (index) => {
    const { miniArticles } = this.props;
    const article = miniArticles.filter(article => article.id_str === index)[0]

    console.log('index', article)
    if (!article.quotedStatus) {
      delete article.quotedStatus
    }
    const data = {}
    data[article.id_str] = article
    myDataRef.update(data)
  }

  render() {
    // Injected by connect() call:
    const { dispatch, miniArticles, isFetching } = this.props;

    if (isFetching) {
      return loader()
    }

    return (
        <MiniArticleList
          miniarticles={miniArticles}
          onMiniArticleClick={ this.handleClick } />
    );

    function loader() {
      return (
        <div style={{ margin: '0 auto', width: 100, padding: '50px 0 50px'}}>
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


//onMiniArticleClick={index =>dispatch(completeMiniArticle(index))} />
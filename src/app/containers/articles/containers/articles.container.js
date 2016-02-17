/**
 * Created by Peter on 30/08/15.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { completeMiniArticle } from '../article.actions.js';
import { startFetchMiniArticles } from '../articleGroup.actions';
import MiniArticleList from '../components/miniArticleList.js';
import Firebase from 'firebase'
var myDataRef = new Firebase('https://fiery-inferno-5861.firebaseio.com/tweets');
//import { Autocomplete } from 'react-toolbox/lib/button';
import { getStates, matchStateToTerm, sortStates, styles } from './autocompleteUtils'
import Autocomplete from 'react-autocomplete'

import { syncTweets, readTweets } from 'business/firebase/firebase'
import store from 'utils/store.js'
import { getFollowers } from './followers'



export default class Articles extends Component {

  state = {
    inputValue: '',
  }

  handleClick = (index) => {
    const { miniArticles } = this.props;
    const article = miniArticles.filter(article => article.id_str === index)[0]

    if (!article.quotedStatus) {
      delete article.quotedStatus
    }
    const data = {}
    data[article.id_str] = article
    myDataRef.update(data)
  }

  handleChange = (value) => {
    this.setState({value: value});
  };


  onInputChange(e) {
    console.log('eee', e.target.value)
    this.setState({ inputValue: e.target.value})
  }

  render() {
    // Injected by connect() call:
    const { dispatch, miniArticles, isFetching } = this.props;

    if (isFetching) {
      return loader()
    }

    return (
      <div>
        <div>
          <input type="text" onChange={this.onInputChange.bind(this)}/>
          <button onClick={ () => dispatch(startFetchMiniArticles({ search: this.state.inputValue }))}>Search</button>
        </div>
        <div>
          <span><b>{ window._userId}   </b></span>
          <button onClick={() => readTweets(dispatch) }>Read</button>
          <button onClick={() => syncTweets(store.getState().miniarticles)}>Sync</button>
          <button style={{ marginLeft: '50%' }}onClick={() => syncTweets(store.getState().miniarticles) }>Add new!!</button>
        </div>
        <b>Total tweets: { miniArticles.length }</b>
        <MiniArticleList
          miniarticles={miniArticles}
          onMiniArticleClick={index =>dispatch(completeMiniArticle(index))} />
      </div>
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
//onMiniArticleClick={ this.handleClick } />
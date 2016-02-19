/**
 * Created by Peter on 30/08/15.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { completeMiniArticle } from '../article.actions.js';
import { startFetchMiniArticles } from '../articleGroup.actions';
import MiniArticleList from '../components/miniArticleList.js';
//import { getStates, matchStateToTerm, sortStates, styles } from './autocompleteUtils'
//import Autocomplete from 'react-autocomplete'

import { syncTweets, readTweets, syncUsers } from 'business/firebase/firebase'
import store from 'utils/store.js'
import { getFollowers } from './followers'

export default class Articles extends Component {

  state = {
    inputValue: '',
    selectValue: ''
  }

  handleChange = (value) => {
    this.setState({value: value});
  };


  onInputChange(e) {
    this.setState({ inputValue: e.target.value})
  }
  onSelectChange(e) {
    this.setState({ selectValue: e.target.value})
  }

  render() {
    // Injected by connect() call:
    const { dispatch, miniArticles, isFetching, likedUserList } = this.props;
    if (isFetching) {
      return loader()
    }

    function getSource() {
      return window._source === 'twitter' ? <span style={{ color: '#FFB347'}}>Twitter</span>
        : <span style={{ color: '#77DD77'}}>Firebase</span>
    }

    return (
      <div>
        <div style={{ margin: '10px 0' }}>
          <input type="text" onChange={this.onInputChange.bind(this)}/>
          <button onClick={ () => dispatch(startFetchMiniArticles({ search: this.state.inputValue }))}>Search</button>
        </div>
        <div style={{ margin: '10px 0' }}>
          <button onClick={ () => dispatch(startFetchMiniArticles({ search: this.state.selectValue }))}>Search - { this.state.selectValue }</button>
          <select id="likedUserList" onChange={this.onSelectChange.bind(this)}>
            { likedUserList.map(user => <option value={ user.screeName }>{ user.screeName }</option>)}
          </select>
        </div>
        <div>
          { getSource() }
          <span><b>  &nbsp;{ window._userId}  &nbsp;{ window._screenName}  &nbsp; </b></span>
          <button onClick={() => readTweets(dispatch) }>Read</button>
          <button onClick={() => syncTweets(store.getState().miniarticles)}>Sync</button>
          <div style={{ marginLeft: '50%' }}>
            <button onClick={() => syncUsers() }>Save new user</button>
            <button onClick={() => syncTweets(store.getState().miniarticles) }>Add new!!</button>
          </div>
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
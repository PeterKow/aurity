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
    selectValue: '',
    min_retweets: 10,
    min_faves: 10,
  }

  //componentWillMount() {
  //  const { tags } = this.props
  //  this.setState({
  //    tags: tags,
  //  })
  //}
  //
  //componentWillReceiveProps() {
  //  const { tags } = this.props
  //  this.setState({
  //    tags: tags,
  //  })
  //}

  handleChange = (value) => {
    this.setState({value: value});
  }

  handleChangeRetweets = (e) => {
    this.setState({min_retweets:  e.target.value});
  }

  handleChangeFaves = (e) => {
    this.setState({min_faves:  e.target.value});
  }


  onInputChange(e) {
    this.setState({ inputValue: e.target.value})
  }
  onSelectChange(e) {
    const { likedUserList } = this.props;
    const likedUser = likedUserList.filter(user => user.screeName ===  e.target.value)[0]
    console.log('likedUser', likedUser, this.forceUpdate)

    this.setState({
      selectValue: e.target.value,
      min_faves: likedUser.min_faves || 10,
      min_retweets: likedUser.min_retweets || 10,
    })
  }

  render() {
    // Injected by connect() call:
    const { dispatch, miniArticles, isFetching, likedUserList } = this.props;
    const { min_retweets, min_faves } = this.state
    if (isFetching) {
      return loader()
    }

    function getSource() {
      return window._source === 'twitter' ? <span style={{ color: '#FFB347'}}>Twitter</span>
        : <span style={{ color: '#77DD77'}}>Firebase</span>
    }

    return (
      <div>
        <div id="searchNew" style={{ margin: '10px 0' }}>
          <input type="text" onChange={this.onInputChange.bind(this)}/>
          <button style={ styleButton } onClick={ () => dispatch(startFetchMiniArticles({ search: this.state.inputValue, min_retweets, min_faves }))}>Search</button>
        </div>
        <div id="searchOld" style={{ margin: '10px 0' }}>
          <button style={ styleButton } onClick={ () => dispatch(startFetchMiniArticles({ search: this.state.selectValue, min_retweets, min_faves}))}>Search - { this.state.selectValue }</button>
          <select style={ styleButton } id="likedUserList" onChange={this.onSelectChange.bind(this)}>
            { likedUserList.map(user => <option value={ user.screeName }>{ user.screeName }</option>)}
          </select>

          <input id="retweets" type="text" value={ min_retweets } onChange={ this.handleChangeRetweets } style={{ width: 50, marginLeft: 10 }}/>
          <label htmlFor="favorite">Fav</label>
          <input id="favorite" type="text" value={ min_faves } onChange={ this.handleChangeFaves } style={{ width: 50, marginLeft: 10 }}/>
          <label htmlFor="favorite">Retweet</label>
        </div>
        <div>
          { getSource() }
          <span><b>  &nbsp;{ window._userId}  &nbsp;{ window._screenName}  &nbsp; </b></span>
          <button style={ styleButton } onClick={() => readTweets(dispatch) }>Read</button>
          <button style={{ ...styleButton, backgroundColor: '#FDFD96', color: 'black' }} onClick={() => syncTweets(store.getState().miniarticles)}>Sync</button>
          <div style={{ marginLeft: '50%' }}>
            <button style={ styleButton } onClick={() => syncUsers({ min_retweets , min_faves}) }>Save new user</button>
            <button style={{ ...styleButton, backgroundColor: '#FF6961' }} onClick={() => syncTweets(store.getState().miniarticles) }>Add list new!!</button>
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

const styleButton = {
  borderRadius: 2,
  padding: '3px 30px',
  margin: '0 5px',
  border: '0px solid',
  borderColor: 'lightgreen',
  backgroundColor: '#779ECB',
  color: 'white',
}

//onMiniArticleClick={index =>dispatch(completeMiniArticle(index))} />
//onMiniArticleClick={ this.handleClick } />
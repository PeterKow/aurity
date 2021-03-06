import React, { Component } from 'react';
import { connect } from 'react-redux';
import Filter from 'containers/articles/components/filter.js';
import Articles from 'containers/articles/containers/articles.container.js'
import { setVisibilityFilter, VisibilityFilters, } from 'containers/articles/article.actions.js'
import { startFetchMiniArticles } from 'containers/articles/articleGroup.actions.js'
import { initSync, readUsers } from 'business/firebase/firebase'
import { check } from 'business/tweeter/tweeterApi'

import Firebase from 'firebase'
var myDataRef = new Firebase('https://fiery-inferno-5861.firebaseio.com/1627149078/70345946');
window._source = 'firebase'

export default class MainPage extends Component {

  componentWillMount() {
    const { dispatch } = this.props

    initSync()
    readUsers(dispatch)
    //dispatch(startFetchMiniArticles())

    myDataRef.orderByKey().on("value", function(snapshot) {
      const newData = []
      const data =  snapshot.val()
      for( var tweet in data ) {
       newData.unshift(data[tweet])
      }
      //console.log('------------', newData);
      dispatch({ type: 'FETCH_MINI_ARTICLES_SUCCESS', data: newData })
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  }

  render() {
    const { dispatch, miniArticles, visibilityFilter, likedUserList } = this.props
    const data = miniArticles.length ? miniArticles : []
    const isFetching = !!miniArticles.isFetching
    return (
      <div>
        <button onClick={ check }>Check cron</button>
        <Filter
          filter={visibilityFilter}
          onFilterChange={nextFilter =>
            dispatch(setVisibilityFilter(nextFilter))
          }/>
        <Articles isFetching={isFetching} miniArticles={data} likedUserList={ likedUserList }/>
      </div>
    );
  }
}

MainPage.propTypes = {
  dispatch: React.PropTypes.func,
  miniArticles: React.PropTypes.array,
  visibilityFilter: React.PropTypes.oneOf([
    'SHOW_ALL',
    'SHOW_COMPLETED',
    'SHOW_ACTIVE',
  ]).isRequired,
}

function selectMiniArticles(miniArticles, filter) {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return miniArticles
    case VisibilityFilters.SHOW_COMPLETED:
      return miniArticles.filter(miniarticle => miniarticle.completed);
    case VisibilityFilters.SHOW_ACTIVE:
      return miniArticles.filter(miniarticle => !miniarticle.completed);
    default:
      return miniArticles
  }
}

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {
  return {
    miniArticles: selectMiniArticles(state.miniarticles, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter,
    searchArticles: state.searchArticles,
    likedUserList: state.user.get('likedUserList'),
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(MainPage)

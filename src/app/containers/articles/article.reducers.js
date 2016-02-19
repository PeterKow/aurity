import { COMPLETE_MINI_ARTICLE, SET_VISIBILITY_FILTER, VisibilityFilters,
         FETCH_MINI_ARTICLES, FETCH_MINI_ARTICLES_FAILED, FETCH_MINI_ARTICLES_SUCCESS } from './article.actions.js'
import { twitterResultsSimple } from './mockTwitterResults.js'
import { syncTweet } from 'business/firebase/firebase'
const { SHOW_ALL } = VisibilityFilters

const initialState = twitterResultsSimple;


export function visibilityFilter(state = SHOW_ALL, action = { type: undefined}) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
}

export function miniarticles(state = initialState, action = { type: undefined}) {
  switch (action.type) {
    case FETCH_MINI_ARTICLES:
      // TODO: change this to immutable, it should be an array but we need also object
      return { isFetching: true }
    case FETCH_MINI_ARTICLES_SUCCESS:
      window._userId =  action.data[0].user.id
      window._screenName =  action.data[0].user.screen_name
      return action.data;
    case FETCH_MINI_ARTICLES_FAILED:
      return { error: action.data};
    case COMPLETE_MINI_ARTICLE:
      const newState = state.map(miniArticle =>
        miniArticle.id_str === action.id ?
        { ...miniArticle, completed: !miniArticle.completed } :
          miniArticle
      )
      syncWithFirebase(newState, action.id)
      return newState
    default:
      return state;
  }
}

function syncWithFirebase(miniArticles, id_str) {
  const article = miniArticles.filter(article => article.id_str === id_str)[0]
  syncTweet(article)
}


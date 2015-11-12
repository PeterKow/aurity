import { COMPLETE_MINI_ARTICLE, SET_VISIBILITY_FILTER, VisibilityFilters,
         FETCH_MINI_ARTICLES, FETCH_MINI_ARTICLES_FAILED, FETCH_MINI_ARTICLES_SUCCESS } from './article.actions.js'
import { twitterResultsSimple } from './mockTwitterResults.js'
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
      return action.data;
    case FETCH_MINI_ARTICLES_FAILED:
      return { error: action.data};
    case COMPLETE_MINI_ARTICLE:
      return state.map(miniArticle =>
          miniArticle.id === action.id ?
          { ...miniArticle, completed: !miniArticle.completed } :
            miniArticle
      );
    default:
      return state;
  }
}

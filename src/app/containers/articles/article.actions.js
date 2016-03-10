/*
 * action types
 */
export const COMPLETE_MINI_ARTICLE = 'COMPLETE_MINI_ARTICLE';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
export const FETCH_MINI_ARTICLES = 'FETCH_MINI_ARTICLES';
export const FETCH_MINI_ARTICLES_FAILED = 'FETCH_MINI_ARTICLES_FAILED';
export const FETCH_MINI_ARTICLES_SUCCESS = 'FETCH_MINI_ARTICLES_SUCCESS';
export const UPDATE_ARTICLE_SUCCESS = 'UPDATE_ARTICLE_SUCCESS';

/*
 * other constants
 */

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE',
};
/*
 * action creators
 */

export function completeMiniArticle(id) {
  return { type: COMPLETE_MINI_ARTICLE, id };
}

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter };
}

export function fetchMiniArticles(payload) {
  window._source = 'twitter'
  return { type: FETCH_MINI_ARTICLES, payload}
}

export function fetchMiniArticlesSuccess(data) {
  return { type: FETCH_MINI_ARTICLES_SUCCESS, data}
}

export function fetchMiniArticlesFailed(data) {
  return { type: FETCH_MINI_ARTICLES_FAILED, data}
}

export function updateArticleSuccess(payload) {
  return { type: UPDATE_ARTICLE_SUCCESS, payload}
}

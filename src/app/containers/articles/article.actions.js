/*
 * action types
 */
export const COMPLETE_MINI_ARTICLE = 'COMPLETE_MINI_ARTICLE';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
export const FETCH_MINI_ARTICLES = 'FETCH_MINI_ARTICLES';
export const FETCH_MINI_ARTICLES_FAILED = 'FETCH_MINI_ARTICLES_FAILED';
export const NEW_MINI_ARTICLES = 'NEW_MINI_ARTICLES';

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

export function newMiniArticles(miniArticles) {
  return { type: NEW_MINI_ARTICLES, miniArticles}
}

export function fetchMiniArticlesFailed() {
  return { type: FETCH_MINI_ARTICLES_FAILED}
}

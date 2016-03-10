/**
 * Created by Peter on 30/08/15.
 */
import React, { Component, PropTypes } from 'react'
import MiniArticle from './miniArticle.js'
import store from 'utils/store'
import { syncTweet, saveTags } from 'business/firebase/firebase'

export default class MiniArticleList extends Component {
  render() {
    return (
      <ul style={{WebkitPaddingStart: '0em'}}>
          {this.props.miniarticles.map((miniArticle, index) =>
              <MiniArticle {...miniArticle}
                key={index}
                onClick={() => this.props.onMiniArticleClick(miniArticle.id_str)}
                onThumbDown={() => syncTweet(setThumbDown(miniArticle))}
                onThumbUp={() => syncTweet(setThumbUp(miniArticle))}
                onStared={() => syncTweet(setStar(miniArticle))}
                saveTags={(tags) => syncTweet(setTags(tags, miniArticle))}
              />
          )}
      </ul>
    );
  }
}

MiniArticleList.propTypes = {
  onMiniArticleClick: PropTypes.func.isRequired,
  miniarticles: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    favoriteCount: PropTypes.number.isRequired,
    retweetCount: PropTypes.number.isRequired,
    quotedStatus: PropTypes.object,
  }).isRequired).isRequired,
}

function setThumbUp(article) {
  article.thumbDown = false
  article.thumbUp = true
  return article
}

function setThumbDown(article) {
  article.thumbDown = true
  article.thumbUp = false
  return article
}

function setStar(article) {
  article.stared = !article.stared
  return article
}

function setTags(tags, article) {
  article.tags = tags
  return article
}
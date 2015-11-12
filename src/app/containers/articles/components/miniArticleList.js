/**
 * Created by Peter on 30/08/15.
 */
import React, { Component, PropTypes } from 'react'
import MiniArticle from './miniArticle.js'
const List = require('material-ui/lib/lists/list');


export default class MiniArticleList extends Component {
  render() {
    return (
      <List subheader="Today">
          {this.props.miniarticles.map((miniArticle, index) =>
              <MiniArticle {...miniArticle}
                key={index}
                onClick={() => this.props.onMiniArticleClick(miniArticle.id)} />
          )}
      </List>
    );
  }
}

MiniArticleList.propTypes = {
  onMiniArticleClick: PropTypes.func.isRequired,
  miniarticles: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired).isRequired,
}

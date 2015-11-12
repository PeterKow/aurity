import React, { Component, PropTypes } from 'react';

const imgStyle = {
  borderRadius: '30px',
  float: 'left',
  marginLeft: '-58px',
  marginTop: '0px',
};

const ListItem = require('material-ui/lib/lists/list-item');
const ListDivider = require('material-ui/lib/lists/list-divider');
const Avatar = require('material-ui/lib/avatar');

export default class MiniArticle extends Component {
  render() {
    return (
      <ListItem
              onClick={this.props.onClick}
              leftAvatar={<Avatar src={this.props.image} />}
              style={styles(this.props.completed)}
              primaryText="TweetAuthor"
              secondaryText={
                <p>
                  {this.props.text}
                </p>
              }
        secondaryTextLines={2} />
        // <ListDivider inset={true} /> //why cant add another element?
      // <li
      //   onClick={this.props.onClick}
      //   style={styles(this.props.completed)}>

      //   <div style={{padding: '9px 12px'}}>
      //     <div style={{marginLeft: 58, height: 50}}>
      //       <img style={imgStyle} src={this.props.image}></img>
      //       {this.props.text}
      //     </div>
      //   </div>
      // </li>
    );
  }
}

function styles(completed) {
  return {
    textDecoration: completed ? 'line-through' : 'none',
    cursor: completed ? 'default' : 'pointer',
    listStyleType: 'none',
  };
}

MiniArticle.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  image: PropTypes.string,
}

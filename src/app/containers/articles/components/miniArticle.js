import React, { Component, PropTypes } from 'react';
import Image from 'containers/utils/image'
import Linkify from 'react-linkify'
import { DragSource } from 'react-dnd';

const imgStyle = {
  borderRadius: '30px',
  float: 'left',
  marginLeft: '-58px',
  marginTop: '0px',
};

export const ItemTypes = {
  KNIGHT: 'knight',
};

const boxSource = {
  beginDrag(props) {
    return {
      name: props.name,
    }
  },
}

@DragSource(ItemTypes.KNIGHT, boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
export default class MiniArticle extends Component {
  render() {
    function getImage(image) {
      return image ? (
        <div style={{ overflow: 'hidden', position: 'relative', height: '15em' }}>
          <Image src={ image } />
        </div>
      ) : ''
    }
    const { connectDragSource } = this.props
    return connectDragSource(
      <li
        onClick={this.props.onClick}
        style={styles(this.props.completed)}>
        <div style={{padding: '9px 12px'}}>
          <div style={{ marginLeft: 58 }}>
            <img style={imgStyle} src={this.props.profileImage}></img>
            <Linkify target="_blank">{this.props.text}</Linkify><br/>
            Favorite: <b>{this.props.favoriteCount}</b> Retweet: <b>{this.props.retweetCount}</b>
            { getImage(this.props.image) }
          </div>
        </div>
      </li>
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
  profileImage: PropTypes.string,
  image: PropTypes.string,
  favoriteCount: PropTypes.number.isRequired,
  retweetCount: PropTypes.number.isRequired,
  connectDragSource: PropTypes.func,
}


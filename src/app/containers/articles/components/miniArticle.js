import React, { Component, PropTypes } from 'react';
import Image from 'containers/utils/image'
import Linkify from 'react-linkify'
import { DragSource } from 'react-dnd';
import Preview from './preview'

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

  constructor(props) {
    super(props)
    this.state = {
      tags: '',
    }
  }

  componentWillMount(nextProps) {
    const { tags } = this.props
    this.setState({
      tags: tags,
    })
  }

  componentWillReceiveProps(nextProps) {
    const { tags } = nextProps
    this.setState({
      tags: tags,
    })
  }

  onTagChange = (e) => {
    this.setState({ tags: e.target.value})
  }

  render() {
    function getImage(image) {
      return image ? (
        <div style={{ overflow: 'hidden', position: 'relative', height: '15em' }}>
          <Image src={ image } />
        </div>
      ) : ''
    }
    const { connectDragSource, quotedStatus, created_at, onThumbDown, onThumbUp, onStared } = this.props
    const { id_str, user, onClick, thumbDown, thumbUp, stared, saveTags } = this.props

    return connectDragSource(
      <li
        style={styles(this.props.completed)}>
        <div style={{padding: '9px 12px'}}>
          <div style={{ marginLeft: 58 }}>
            <img style={imgStyle} src={this.props.profileImage}></img>
            <div id="manage">
              { user.screenName }
              <a target="_blank" href={`https://twitter.com/${user.screenName}/status/${ id_str }`}>Twitter</a>
              <span style={{ borderRadius: 5, padding: 4, backgroundColor: 'greenyellow', margin: '0 10px'}}
                    onClick={ onClick }>
                DONE
              </span>
              <span style={ getStyle(thumbDown) } onClick={ onThumbDown }>{ showThumbDown() }</span>
              <span style={ getStyle(thumbUp) } onClick={ onThumbUp }>{ showThumbUp() }</span>
              <span style={ getStyle(stared) } onClick={ onStared }>{ showStar() }</span>
              <span style={{ marginLeft: 10 }}>{ created_at }</span>
            </div>
            <div id="tags" style={{ marginTop: 5 }}>
              <input onChange={ this.onTagChange } value={ this.state.tags }/>
              <button onClick={ () => saveTags(this.state.tags) }>Save tags</button>
            </div>
            <Linkify target="_blank">{this.props.text}</Linkify><br/>
            { quotedStatus ? <Preview content={ quotedStatus }/> : '' }
            Favorite: <b>{this.props.favoriteCount}</b> Retweet: <b>{this.props.retweetCount}</b>
            { getImage(this.props.image) }
          </div>
        </div>
        <hr style={{ borderTop: '3px solid #CCC' }}/>
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

MiniArticle.defaultProps = {
  user: {
    screenName: 'dan_abramov',
  },
}

MiniArticle.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  profileImage: PropTypes.string,
  tags: PropTypes.string,
  image: PropTypes.string,
  favoriteCount: PropTypes.number.isRequired,
  retweetCount: PropTypes.number.isRequired,
  quotedStatus: PropTypes.object,
  connectDragSource: PropTypes.func,
}

function getStyle(mark) {
  const style = { margin: '0 10px', backgroundColor: mark ? 'dodgerblue' : 'none' }
  return style
}

function showStar(stared) {
  return stared ? '⭐' : ' ⭐';
}

function showThumbUp(thumbUp) {
  return thumbUp ? '👍' : '👍'
}
function showThumbDown(thumbDown) {
  return thumbDown ? '👎' : "👎";
}
import React, { PropTypes, Component } from 'react';
import { DropTarget } from 'react-dnd';

const style = {
  position: 'absolute', height: '80vh', width: '80vh',
  backgroundColor: 'red', opacity: 0.3, borderRadius: '50vh',
  transform: 'translate(-40vh,-40vh)',
}

export const ItemTypes = {
  KNIGHT: 'knight',
};


const dustbinTarget = {
  drop(props, monitor) {
    props.onDrop(monitor.getItem());
  },
};

@DropTarget(ItemTypes.KNIGHT, dustbinTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))
export default class DropZone extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    accepts: PropTypes.arrayOf(PropTypes.string).isRequired,
    lastDroppedItem: PropTypes.object,
    styles: PropTypes.object,
    onDrop: PropTypes.func.isRequired,
    zIndex: -1,
  };

  render() {
    const { accepts, isOver, canDrop, connectDropTarget, lastDroppedItem, styles } = this.props;
    const isActive = isOver && canDrop;

    console.log('isOver', isOver, canDrop)
    let display = 'none'
    let opacity = 0.0;
    if (isOver) {
      opacity = 0.8
      display = ''
    } else if (canDrop) {
      opacity = 0.6;
      display = ''
    }
    console.log('sds', styles)

    return connectDropTarget(
      <div style={{ ...style, ...styles, opacity, display }}/>
    );
  }
}

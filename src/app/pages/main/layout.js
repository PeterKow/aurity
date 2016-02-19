import React, { Component } from 'react';
import Navbar from 'containers/navbar/navbar.js'
import { DragDropContext } from 'react-dnd';
import HTML5Backend, { NativeTypes } from 'react-dnd-html5-backend';
import DropZone from 'containers/elements/dropZone'


@DragDropContext(HTML5Backend)
export default class Layout extends Component {
  render() {
    return (
      <div>
        <DropZone/>
        <DropZone styles={{ backgroundColor: 'green', transform: 'translate(80vh,-40vh)' }}/>

        <div className="containerMain">
          <Navbar/>
          {/* this will render the child routes */}
          {this.props.children}
        </div>
      </div>
    )
  }
}

Layout.propTypes = {
  children: React.PropTypes.node.isRequired,
}

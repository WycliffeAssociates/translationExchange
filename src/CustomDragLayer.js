import React from 'react';
import PropTypes from 'prop-types';
// import ItemTypes from './ItemTypes';
// import BoxDragPreview from './BoxDragPreview';
// import snapToGrid from './snapToGrid';
import { DragLayer } from 'react-dnd';
import unitSkeleton from './assets/images/UnitSkeleton.png'


const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 101,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
};

function getItemStyles(props) {
  const { currentOffset } = props;
  if (!currentOffset) {
    return {
      display: 'none',
    };
  }

  const { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform: transform,
    WebkitTransform: transform,
  };
}

class CustomDragLayer extends React.Component {
  renderItem(type, item) {
    switch (type) {
      case 'TakeCard':
        return (
          <img src={unitSkeleton} />
        );
    }
  }

  render() {
    const { item, itemType, isDragging } = this.props;
    if (!isDragging) {
      return null;
    }

    return (
      <div style={layerStyles}>
        <div style={getItemStyles(this.props)}>
          {this.renderItem(itemType, item)}
        </div>
      </div>
    );
  }
}

CustomDragLayer.propTypes = {
  item: PropTypes.object,
  itemType: PropTypes.string,
  currentOffset: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
  isDragging: PropTypes.bool.isRequired,
};

function collect(monitor) {
  return {
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  };
}

export default DragLayer(collect)(CustomDragLayer);

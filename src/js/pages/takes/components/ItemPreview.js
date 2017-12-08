import React from 'react';
import DragLayer from 'react-dnd/lib/DragLayer';
import { Grid, Segment } from "semantic-ui-react";
import StitchTakesButton from "../StitchTakesButton";
import TakeCommentsButton from "./comments/TakeCommentsButton";
import Take from "../Take";
import TakeListenButton from "../AddTake";
import blur from '../../../../images/blur.PNG'

function collect (monitor) {
    var item = monitor.getItem();

    return {
        rect: item && item.rect,
        id: item && item.listId,
        name: item && item.index,
        currentOffset: monitor.getSourceClientOffset(),
        isDragging: monitor.isDragging(),
        monitor: monitor,
        item
    };
}

function getItemStyles (currentOffset, rect) {
    if (!currentOffset) {
        return {
            display: 'none'
        };
    }

    // http://www.paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft/
    var x = currentOffset.x  ;
    var y = currentOffset.y;
    var transform = `translate(${x}px, ${y}px)`;

    return {
        pointerEvents: 'none',
        transform: transform,
        WebkitTransform: transform,
        height: 0,
        width:0,
        position:'absolute',
        zIndex: 1


    };
}

function ItemPreview ({
    isDragging,
    currentOffset,
    count,
    take,
    author,
    chunkNumber,
    source,
    comments,
    addToListenList,
    active,
    height,
    width,
    item,
    monitor,
    rect



}) {



    return (
        <div style={getItemStyles(currentOffset, rect)}>
        <img src={blur} style = {{width: 335, height: 190}}/>
        </div>

    );

}

ItemPreview.propTypes = {
    id: React.PropTypes.string,
    name: React.PropTypes.string,
    currentOffset: React.PropTypes.shape({
        x: React.PropTypes.number,
        y: React.PropTypes.number
    }),
    isDragging: React.PropTypes.bool
};

export default DragLayer(collect)(ItemPreview);

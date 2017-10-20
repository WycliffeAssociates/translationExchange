import React from 'react';
import DragLayer from 'react-dnd/lib/DragLayer';
import { Grid, Segment } from "semantic-ui-react";
import StitchTakesButton from "./StitchTakesButton";
import TakeCommentsButton from "./comments/TakeCommentsButton";
import Take from "./Take";
import TakeListenButton from "./AddTake";
import blur from '../../../../images/blur.png'

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
        position:'relative',
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




//       <div style={getItemStyles(currentOffset, rect)}>
//       <Segment>
//         <Grid textAlign="left">
//           <Grid.Row>
//             <Grid.Column width={12}>
//               <Grid.Row verticalAlign="top">
//                 <Grid>
//                   <Grid.Column width={11} floated="left">
//                     <font size="3">
//                       <strong>
//                         {"take"} {count} -{" "}
//                       </strong>
//                     </font>
//                     <font size="2" color="grey">
//                       {author
//                         ? author.name
//                         : "Unknown Author"}
//                     </font>
//                   </Grid.Column>
//                   <Grid.Column floated="right">
//                     <StitchTakesButton
//                     />
//                   </Grid.Column>
//                 </Grid>
//               </Grid.Row>
//
//               <Grid.Row>
//                 {"date"}
//               </Grid.Row>
//               <Grid.Row className="centerPlayButton">
//                 <br />
//                 <TakeListenButton
//
//
//
//                 />
//               </Grid.Row>
//               <Grid.Row verticalAlign="bottom">
//                 <br />
//
//               </Grid.Row>
//             </Grid.Column>
//           </Grid.Row>
//         </Grid>
//       </Segment>
// </div>
    // );
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

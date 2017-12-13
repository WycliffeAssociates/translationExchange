import React, {Component} from 'react';
import {Grid, Segment, Icon, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { compose } from 'redux'
import DragLayer from 'react-dnd/lib/DragLayer';
import StitchTakesButton from "../StitchTakesButton";
import TakeCommentsButton from "./comments/TakeCommentsButton";
import Take from "../Take";
import TakeListenButton from "../AddTake";
import blur from '../../../../images/blur.PNG'

const collect = (monitor) => {
    var item = monitor.getItem();
    return {
        rect: item && item.rect,
        id: item && item.listId,
        name: item && item.index,
        currentOffset: monitor.getSourceClientOffset(),
        isDragging: monitor.isDragging(),
        monitor: monitor,
        take: item && item.take,
        item
    };
}

const getItemStyles= (currentOffset, take ) => {
    if (!currentOffset) {
        return {
            display: 'none'
        };
    }

    // http://www.paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft/
    var x = currentOffset.x;
    var y = currentOffset.y;

    //console.log(`x: ${x} y:${y}`);
    var transform = `translate(${x}px, ${y}px)`;

    return {
        pointerEvents: 'none',
        transform: transform,
        WebkitTransform: transform,
        position:'absolute',
        zIndex: 1,
        width: '20%'
    };
}



const ItemPreview = ({
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

}) => {
  let takeText = '';
  let date = '';
  if(take !== null){
      takeText = `Take ${take.order}`;
    date = parseDate(take.date_modified);
      }
    return (
        <div style={getItemStyles(currentOffset, take)}>
          <Segment>
    				<Grid textAlign="left">
    					<Grid.Row>
    						<Grid.Column width={12}>
    							<Grid.Row verticalAlign="top">
    								<Grid>
    									<Grid.Column width={11} floated="left">
    										<font size="3">
    											<strong>
    											 {takeText} -{" "}
    											</strong>
    										</font>
    										<font size="2" color="grey">
    											 Unknown Author
    										</font>
    									</Grid.Column>
    									<Grid.Column floated="right">
    										  <Icon name='plus' color="blue" size="large" className="hoverButton" />
    									</Grid.Column>
    								</Grid>
    							</Grid.Row>

    							<Grid.Row>
                    {date}
    							</Grid.Row>
    							<Grid.Row className="centerPlayButton">
    								<br />
                    <Button
              				circular
              				basic
              				icon
              				color="black"
              				toggle

              			>
              				<Icon name="play" size="big" color="blue" />
              			</Button>
    							</Grid.Row>
    							<Grid.Row verticalAlign="bottom">
    								<br />
                    <Button
          						fluid
          						// active={this.state.active}
          						// color={this.state.active ? "yellow" : null}
          					>
          						<Icon name="comment outline" />
          					</Button>
    							</Grid.Row>
    						</Grid.Column>
    					</Grid.Row>
    				</Grid>
    			</Segment>
        </div>
    );
}

const parseDate = (date) => {      //TODO get the displaytext from redux
  var noon = "am";
  var dateArr = date.split("T");
  var date = dateArr[0];

  var time = dateArr[1].split(".");
  time = time[0].split(":");
  date = date.split("-");
  switch (date[1]) {
    case "01":
      date[1] = "January";
      break;
    case "02":
      date[1] = "February";
      break;
    case "03":
      date[1] = "March";
      break;
    case "04":
      date[1] = "April";
      break;
    case "05":
      date[1] = "May";
      break;
    case "06":
      date[1] = "June";
      break;
    case "07":
      date[1] = "July";
      break;
    case "08":
      date[1] = "August";
      break;
    case "09":
      date[1] = "September";
      break;
    case "10":
      date[1] = "October";
      break;
    case "11":
      date[1] = "November";
      break;
    case "12":
      date[1] = "December";
      break;
  }

  var hour = parseInt(time[0]);
  if (hour / 12 > -1) {
    noon = "pm";
  }

  if (!(hour % 12 === 0)) {
    hour %= 12;
  }

  return (`${date[1]} ${date[2]}, ${date[0]} at ${hour}:${time[1]}${noon}`);
}


const mapStateToProps = state => {
    	const { displayText } = state.geolocation;

	return { displayText };
}



export default compose( DragLayer(collect),connect(mapStateToProps))(ItemPreview);

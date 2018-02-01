import React, {Component} from 'react';
import {Grid, Segment, Icon, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { compose } from 'redux'
import DragLayer from 'react-dnd/lib/DragLayer';


const collect = (monitor) => {
    var item = monitor.getItem();
    return {

        id: item && item.listId,
        name: item && item.index,
        currentOffset: monitor.getSourceClientOffset(),
        isDragging: monitor.isDragging(),
        monitor: monitor,
        take: item && item.take,
        active: item && item.active,
        item
    };
};

const getItemStyles= (currentOffset ) => {

    if (!currentOffset) {
        return {
            display: 'none'
        };
    }

    const winOffset = window.pageYOffset ;

    // http://www.paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft/
    const x = currentOffset.x;
    const y = currentOffset.y + winOffset;  // addoffset when the screen is scrolled because the origin is respect to the (0,0) component and not the window

    const transform = `translate(${x}px, ${y}px)`;

    return {
        pointerEvents: 'none',
        transform: transform,
        WebkitTransform: transform,
        position:'absolute',
        zIndex: 1,
        width: '20%',

    };
};

class ItemPreview extends Component {

render(){

  let {take} = this.props;
  let active = false;
  let takeText = '';
  let date = '';
  if(take !== null){
      takeText = `${this.props.displayText.take} ${take.order}`;
    date = this.parseDate(take.date_modified);
    active = this.props.take.has_comment;
      }
    return (
        <div style={getItemStyles(this.props.currentOffset)}>
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
          						 color={active ? "yellow" : null}
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


 parseDate(dateReceived)    {
    let noon = "am";
    let dateArr = dateReceived.split("T");
    let date = dateArr[0];
    let time = dateArr[1].split(".");
    time = time[0].split(":");
    date = date.split("-");
    switch (date[1]) {
      case "01":
        date[1] = this.props.displayText.month1;
        break;
      case "02":
        date[1] = this.props.displayText.month2;
        break;
      case "03":
        date[1] = this.props.displayText.month3;
        break;
      case "04":
        date[1] = this.props.displayText.month4;
        break;
      case "05":
        date[1] = this.props.displayText.month5;
        break;
      case "06":
        date[1] = this.props.displayText.month6;
        break;
      case "07":
        date[1] = this.props.displayText.month7;
        break;
      case "08":
        date[1] = this.props.displayText.month8;
        break;
      case "09":
        date[1] = this.props.displayText.month9;
        break;
      case "10":
        date[1] = this.props.displayText.month10;
        break;
      case "11":
        date[1] = this.props.displayText.month11;
        break;
      case "12":
        date[1] = this.props.displayText.month12;
        break;
      default:
        date[1] = '';
        break;

    }

    let hour = parseInt(time[0], 10);
    if (hour / 12 > -1) {
      noon = "pm";
    }

    if (!(hour % 12 === 0)) {
      hour %= 12;
    }

    return (`${date[1]} ${date[2]}, ${date[0]} ${this.props.displayText.at} ${hour}:${time[1]}${noon}`);
  }


}


const mapStateToProps = state => {
    	const { displayText } = state.geolocation;

	return { displayText };
};



export default compose( DragLayer(collect),connect(mapStateToProps))(ItemPreview);

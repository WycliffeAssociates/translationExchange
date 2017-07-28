import React, {Component} from 'react';
import PropTypes from 'prop-types';
import config from "config/config";
import {Button, Grid, Segment, Card, Modal, Icon} from "semantic-ui-react";
import TakeListenButton from './AddTake'
import 'css/takes.css'
import StitchTakesButton from "./StitchTakesButton";
import TakeCommentsButton from "./comments/TakeCommentsButton";

var listenCounter = 0

class Take extends Component {

    constructor(props) {
        super(props);
        this.state = {isToggleOn: true, addButtonColor: "", showMarkers: false, showMarkersColor: ""}
        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
        // this.showMarker = this.showMarker.bind(this);
    }

    handleClick() {
        this.setState({isToggleOn: !this.state.isToggleOn});
    }

    addToListen() {
        this.props.addToListenList(this.props);

        if (this.state.addButtonColor !== "blue") {
            this.setState(
                {
                    addButtonColor: "blue"
                }
            )
        }
        else {
            this.setState(
                {
                    addButtonColor: ""
                }
            )
        }
    }

    moveLeft() {
        if (this.props.take.is_publish) {
            this.props.onMarkedForExportToggled();
        } else if (this.props.take.rating > 1) {
            this.props.onRatingSet(this.props.take.rating - 1)
        }
    }

    moveRight() {
        if (this.props.take.rating < 3) {
            this.props.onRatingSet(this.props.take.rating + 1)
        } else {
            this.props.onMarkedForExportToggled();
        }
    }


    render() {
        const markers = this.props.take.markers;
        let showMarkers = this.state.showMarkers;
        var file = [];
        file[0] = {
            "src": config.streamingUrl + this.props.take.location
        };

        return (


            <Segment>

                <Grid textAlign="left">
                    <Grid.Row>
                        <Grid.Column verticalAlign="middle">
                            {this.props.take.rating > 1
                                ? <Icon className="hoverButton" name="chevron left" onClick={this.moveLeft.bind(this)}/>
                                : <Icon className="hoverButton" name="trash" color="red" onClick={this.props.onDeleteTake}/>
                            }
                        </Grid.Column>

                        <Grid.Column width={12}>

                            <Grid.Row verticalAlign="top">
                                <Grid>
                                    <Grid.Column width={11} floated="left">
                                        <font size="3"><strong>Take {this.props.count} -  </strong></font>
                                        <font size="2" color="grey"> {this.props.author.name}</font>
                                    </Grid.Column>
                                    <Grid.Column floated="right">
                                        <StitchTakesButton onClick={this.addToListen.bind(this)} size="huge" color="blue"/>
                                    </Grid.Column>
                                </Grid>
                            </Grid.Row>

                            <Grid.Row>
                                {this.parseDate(this.props.take.date_modified)}
                            </Grid.Row>
                            <Grid.Row className="centerPlayButton">
                                <br />
                                <TakeListenButton onClick={ () =>
                                    this.props.playTake(this.props.take.location,
                                        this.props.chunkNumber,
                                        this.props.author.name,
                                        this.parseDate(this.props.take.date_modified))

                                }
                                />
                            </Grid.Row>
                            <Grid.Row verticalAlign="bottom">
                                <br />
                                <TakeCommentsButton  take={this.props.take}
                                                     comments={this.props.comments}
                                                     onClickSave={this.props.onClickSave}
                                                     deleteComment={this.props.deleteComment}
                                                     loadingActive={this.props.active}
                                />
                            </Grid.Row>
                        </Grid.Column>

                        <Grid.Column verticalAlign="middle">
                            {this.props.take.is_publish
                            ? ""
                            : <Icon className="hoverButton" name="chevron right" onClick={this.moveRight.bind(this)}/>
                        }</Grid.Column>

                    </Grid.Row>
                </Grid>

            </Segment>

        );
    }

    parseDate(date) {

        var noon = 'am';
        var dateArr = date.split('T');
        var date = dateArr[0]

        var time = dateArr[1].split('.')
        time = time[0].split(':')
        date = date.split('-')
        switch (date[1]) {
            case '01':
                date[1] = 'January';
                break;
            case '02':
                date[1] = 'February';
                break;
            case '03':
                date[1] = 'March';
                break;
            case '04':
                date[1] = 'April';
                break;
            case '05':
                date[1] = 'May';
                break;
            case '06':
                date[1] = 'June';
                break;
            case '07':
                date[1] = 'July';
                break;
            case '08':
                date[1] = 'August';
                break;
            case '09':
                date[1] = 'September';
                break;
            case '10':
                date[1] = 'October';
                break;
            case '11':
                date[1] = 'November';
                break;
            case '12':
                date[1] = 'December';
                break;
        }

        var hour = parseInt(time[0])
        if ((hour / 12) > -1) {
            noon = 'pm'
        }

        if (!((hour % 12) === 0)) {
            hour %= 12
        }

        return (date[1] + ' ' + date[2] + ', ' + date[0] + ' at ' + hour + ':' + time[1] + noon);
    }
}

Take.propTypes = {
    count: PropTypes.number.isRequired,
    take: PropTypes.object.isRequired,
    author: PropTypes.string.isRequired,
    onRatingSet: PropTypes.func.isRequired,
    onMarkedForExportToggled: PropTypes.func.isRequired,
    takeId: PropTypes.number.isRequired
};


export default Take;

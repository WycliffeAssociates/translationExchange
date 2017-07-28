import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Star from './Star';
import AudioComponent from './AudioComponent';
import config from "config/config";
import {Button, Grid, Segment, Card, Modal, Icon} from "semantic-ui-react";
import TakeListenButton from './AddTake'
import DeleteTake from './DeleteTake'
import LoadingGif from 'images/loading-tiny.gif'
import TakeExportButton from "./SelectTake";
import ShowMarkers from './ShowMarkers';
import 'css/takes.css'
import SideBar from './SideBar'

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

    // showMarker() {
    //
    //     if (!this.state.showMarkers) {
    //         this.setState({showMarkersColor: 'yellow', showMarkers: true});
    //         console.log('here', this.state.showMarkers);
    //
    //     } else {
    //         this.setState({showMarkersColor: '', showMarkers: false});
    //     }
    //
    // }

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

    moveLeft () {
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

            <div>


                <Segment.Group horizontal textAlign="center"  >
                    {this.props.take.rating > 1
                        ? <Segment className="hoverButton" onClick={this.moveLeft.bind(this)}> <Icon name="chevron left" /></Segment>
                        : ""
                    }

                    <Segment>
                <strong><font color="blue">{this.props.author.name}</font> on {this.parseDate(this.props.take.date_modified)}</strong>

                {/*{<TakeExportButton active={this.props.take.is_publish} onClick={this.props.onMarkedForExportToggled}/>}*/}
                <TakeListenButton onClick={ () =>
                                      this.props.playTake(this.props.take.location,
                                          this.props.chunkNumber,
                                          this.props.author.name,
                                          this.parseDate(this.props.take.date_modified))
                                  }
                />
                {/*<TakeListenButton onClick={this.addToListen.bind(this)} color={this.state.addButtonColor}/>*/}
                {/*<DeleteTake onDeleteTake={this.props.onDeleteTake}/>*/}

                {/*<ShowMarkers onClick = {this.showMarker} showMarkersColor={this.state.showMarkersColor} />*/}

                    {/*{this.props.source*/}
                        {/*? <div>*/}
                            {/*<Button onClick={(e) => this.handleClick(e)} content='Source Audio' icon='right arrow'*/}
                                    {/*labelPosition='right'/>*/}
                            {/*Language: {this.props.source.language.name}*/}
                        {/*</div>*/}
                        {/*: ""*/}

                    {/*}*/}
                    </Segment>

                    {this.props.take.is_publish
                        ? ""
                        : <Segment onClick={this.moveRight.bind(this)} className="hoverButton"> <Icon name="chevron right" /></Segment>
                    }

                </Segment.Group>

            </div>

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

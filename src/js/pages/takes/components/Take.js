import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Star from './Star';
import AudioComponent from './AudioComponent';
import config from "config/config";
import {Button, Grid, Segment} from "semantic-ui-react";
import TakeExportButton from './SelectTake'
import CommentsButton from "./CommentsButton";
import TakeListenButton from './AddTake'
import DeleteTake from './DeleteTake'
import LoadingGif from 'images/loading-tiny.gif'
import CommentContainer from "./comments/CommentContainer";

var listenCounter = 0
class Take extends Component {

    constructor(props) {
        super(props);
        this.state = {isToggleOn: true, addButtonColor: ""}
        // This binding is necessary to make `this` work in the callback
         this.handleClick = this.handleClick.bind(this);
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


    render () {
        var file = [];
        file[0] = {
            "src": config.streamingUrl + this.props.take.location
        };
        return (
            <div>
        <Grid columns={5} relaxedclassName="take">

            <Grid.Column width={4}>
                <strong>Take {this.props.count} by <font color="blue">{this.props.author.name}</font> - {this.parseDate(this.props.take.date_modified)}</strong>
            </Grid.Column>

            <Grid.Column width={2}>
                {this.props.ratingLoading
                    ? <img src={LoadingGif} alt="Loading..." width="16" height="16"/>
                    : <Star rating={this.props.take.rating} onChange={this.props.onRatingSet}/>
                }

            </Grid.Column>

            <Grid.Column width={3}>
                <TakeExportButton active={this.props.take.is_export} onClick={this.props.onMarkedForExportToggled}/>
                <TakeListenButton onClick={this.addToListen.bind(this)} color={this.state.addButtonColor}/>
                <DeleteTake onDeleteTake={this.props.onDeleteTake}/>
                <CommentsButton comments = {this.props.comments}/>
            </Grid.Column>

            {this.props.source
                ? <Grid.Column width={5}>
                    <Button onClick={(e) => this.handleClick(e)} content='Source Audio' icon='right arrow'
                            labelPosition='right'/>
                    Language: {this.props.source.language.name}
                </Grid.Column>
                : ""

            }

            <Grid.Column width={1}> <CommentContainer
                ref={instance => (this.commentContainer = instance)}/> </Grid.Column>

        </Grid>


            <Grid columns={2} relaxed>
                <Grid.Column width={9}>
                    <AudioComponent
                        src={config.streamingUrl + this.props.take.location}
                        playlist={file}
                        width="700"
                        mic={true}
                        take={this.props.take}
                    />
                </Grid.Column >

                {this.state.isToggleOn ? '' :

                    <Grid.Column width={4}>
                            <AudioComponent
                                src={config.streamingUrl + this.props.take.location}
                                playlist={file}
                                width="200"
                                name="Source Audio"
                                mic={false}
                                take={this.props.take}
                            />
                    </Grid.Column>}

            </Grid>

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
            case '01': date[1] = 'January';
                break;
            case '02': date[1] = 'February';
                break;
            case '03': date[1] = 'March';
                break;
            case '04': date[1] = 'April';
                break;
            case '05': date[1] = 'May';
                break;
            case '06': date[1] = 'June';
                break;
            case '07': date[1] = 'July';
                break;
            case '08': date[1] = 'August';
                break;
            case '09': date[1] = 'September';
                break;
            case '10': date[1] = 'October';
                break;
            case '11': date[1] = 'November';
                break;
            case '12': date[1] = 'December';
                break;
        }

        var hour = parseInt(time[0])
        if((hour / 12) > -1)
        {noon = 'pm'}

        if(!((hour % 12) === 0))
        {hour %= 12}

        return (date[1] + ' ' + date[2] + ', ' +  date[0] + ' at ' + hour + ':' + time[1] + noon);
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

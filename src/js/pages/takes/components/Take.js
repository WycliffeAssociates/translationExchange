import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Star from './Star';
import AudioComponent from './AudioComponent';
import config from "config/config";
import {Button, Grid, Segment} from "semantic-ui-react";
import TakeExportButton from './SelectTake'
import Delete from './Delete'

class Take extends Component {

    constructor(props) {
        super(props);
        this.state = {isToggleOn: true};
        // This binding is necessary to make `this` work in the callback
         this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({isToggleOn: !this.state.isToggleOn});
    }

    render () {
        return (
            <div>
        <Grid columns={4} relaxedclassName="take">

            <Grid.Column width={4}>
                <strong>Take {this.props.count} by <font color="blue">{this.props.author.name}</font> - {this.parseDate()}</strong>
            </Grid.Column>

            <Grid.Column width={2}>
                <Star rating={this.props.take.rating} onChange={this.props.onRatingSet}/>
            </Grid.Column>

            <Grid.Column width={2}>
                <TakeExportButton active={this.props.take.is_export} onClick={this.props.onMarkedForExportToggled}/>
                <Delete/>
            </Grid.Column>

            <Grid.Column>
                <Button onClick={(e) => this.handleClick(e)} content='Source Audio' icon='right arrow' labelPosition='right' />
            </Grid.Column>

        </Grid>

            <Grid columns={2} relaxed>
                <Grid.Column width={9}>
                    <AudioComponent
                        src={config.streamingUrl + this.props.take.location}
                        width="700"
                    />
                </Grid.Column >

                {this.state.isToggleOn ? '' :

                    <Grid.Column width={4}>
                            <AudioComponent
                                src={config.streamingUrl + this.props.take.location}
                                width="200"
                            />
                    </Grid.Column>}

            </Grid>

        </div>
        );
    }

    parseDate() {
        var noon = 'am';
        var dateArr = this.props.take.date_modified.split('T');
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
    onMarkedForExportToggled: PropTypes.func.isRequired
};



export default Take;
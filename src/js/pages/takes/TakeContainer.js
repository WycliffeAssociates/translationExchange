import React, { Component } from 'react';
import TakePropTypes from "./components/TakePropTypes";
import Star from './components/Star';

import AudioComponent from './components/AudioComponent';
import axios from 'axios';
import config from "config/config";
import {Button, Grid, Segment} from "semantic-ui-react";

var author
class TakeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {isToggleOn: true};

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
    }

    onRatingSet (newRating) {
        console.log("new rating for take " + this.props.take.take.id + ": " + newRating);
        //would do an AJAX request here to update rating on this take using its id...
    }

    //other functions here for dealing with new audio comments recorded, etc


    render () {

        return (

            <div className="take">
        <strong>Take {this.props.count} by <font color="blue">{this.props.take.user.name}</font> - {this.parseDate()}
            </strong>
                <Star rating={this.props.take.take.rating} onChange={this.onRatingSet.bind(this)}/>

                <Grid columns={2} relaxed>
                    <Grid.Column width={9}>

                        <AudioComponent
                            src={config.streamingUrl + this.props.take.take.location}
                        />
                <Delete/>
                    </Grid.Column >

                    <Button onClick={(e) => this.handleClick(e)} content='Source Audio' icon='right arrow' labelPosition='right' />
                    {this.state.isToggleOn ? '' :

                        <Grid.Column width={5}>
                        {/* the segment will be replaced with audio component?*/}
                        <Segment basic>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio.
                        </Segment>
                    </Grid.Column>}

                </Grid>


                {/*<Card>*/}
                    {/*{this.findAuthor()}*/}
                    {/*<strong>Take {this.props.count} by <font color="blue">{author}</font> on [date]</strong>*/}
                    {/*<Button onClick={(e) => this.handleClick(e)} content='Source Audio' icon='right arrow' labelPosition='right' />*/}
                    {/*<Star rating={this.props.take.rating} onChange={this.onRatingSet.bind(this)}/>*/}
                    {/*<AudioComponent*/}
                        {/*src={config.streamingUrl + this.props.take.location}*/}
                    {/*/>*/}
                    {/*<Delete/>*/}
                {/*</Card>*/}

                {/*<Card fluid color='red' header='Option 1' >source audio</Card>*/}

            </div>
        );
    }

    parseDate(props) {
        var noon = 'am';
        var dateArr = this.props.take.take.date_modified.split('T');
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

        var hour = parseInt(time[0]);
        if((hour / 12) > -1)
            {noon = 'pm'}

        if(!((hour % 12) === 0))
            {hour %= 12}

        return (date[1] + ' ' + date[2] + ', ' +  date[0] + ' at ' + hour + ':' + time[1] + noon);
    }

}

class Delete extends React.Component{
    render(){
        return <button type="image" id="myimage"  src='./Bitmap' /*href for where I want to go*/>
Delete
        </button>//href for where I want to go

    }

}

TakeContainer.propTypes = {
    take: TakePropTypes
};

export default TakeContainer;
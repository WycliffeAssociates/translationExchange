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
        console.log("new rating for take " + this.props.take.id + ": " + newRating);
        //would do an AJAX request here to update rating on this take using its id...
    }

    //other functions here for dealing with new audio comments recorded, etc

    // Retrieves author information from the database
    findAuthor() {

            axios.get(config.apiUrl + 'users/').then((results => {

                for (let i = 0; i < results.data.length; i++) {
                    if (results.data[i].id === this.props.take.user) {
                        author = results.data[i].name
                    }
                }
            }))

    }

    render () {
        return (

            <div className="take">
                {this.findAuthor()}
                <strong>Take {this.props.count} by <font color="blue">{author}</font> on [date]</strong>

                <Star rating={this.props.take.rating} onChange={this.onRatingSet.bind(this)}/>

                <Grid columns={2} relaxed>
                    <Grid.Column width={9}>

                <AudioComponent
                    src={config.streamingUrl + this.props.take.location}
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
}

class Delete extends React.Component{
    render(){
        return <button type="image" id="myimage"  src='./Bitmap' /*href for where I want to go*/>

        </button>//href for where I want to go

    }

}

TakeContainer.propTypes = {
    take: TakePropTypes
};

export default TakeContainer;
import React, { Component } from 'react';
import TakePropTypes from "./components/TakePropTypes";
import Star from './components/Star';

import AudioComponent from './components/AudioComponent';
import axios from 'axios';
import config from "config/config";
import { Button } from 'reactstrap';

var author
class TakeContainer extends Component {


    onRatingSet (newRating) {
        console.log("new rating for take " + this.props.take.take.id + ": " + newRating);
        //would do an AJAX request here to update rating on this take using its id...
    }

    //other functions here for dealing with new audio comments recorded, etc



    render () {

        return (


            <div className="take">
                <div>
                    <strong>Take {this.props.count} by <font color="blue">{this.props.take.user.name}</font> on [date]</strong>
                    <Star rating={this.props.take.take.rating} onChange={this.onRatingSet.bind(this)}/>
                    <AudioComponent
                        src={config.streamingUrl + this.props.take.take.location}
                    />
                    <Delete/>
                </div>
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
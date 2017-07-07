import React, { Component } from 'react';
import TakePropTypes from "./TakePropTypes";
import Star from '../../../shared/Star';
import AudioComponent from './AudioComponent'
import { Button } from 'reactstrap';
//var Button = require('react-native-icon-button');
//import React from 'react';
//import { Button } from 'reactstrap';



class TakeContainer extends Component {
    onRatingSet (newRating) {
        console.log("new rating for take " + this.props.take.id + ": " + newRating);
        //would do an AJAX request here to update rating on this take using its id...
    }

    //other functions here for dealing with new audio comments recorded, etc

    render () {

        return (

            <div className="take">
                <br />
                <strong>Take by {this.props.take.author} on {this.props.take.timestamp}</strong>
                <Star rating={this.props.take.rating} onChange={this.onRatingSet.bind(this)}/>
                <AudioComponent name={'Rating: ' + this.props.take.rating + '/3'} src={this.props.take.audioSource}/>
                <Delete/>

                <br />
                <br />
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

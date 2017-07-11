import React, { Component } from 'react';
import TakePropTypes from "./TakePropTypes";
import Star from '../../../shared/Star';
import AudioComponent from './AudioComponent'
import axios from 'axios'

var author
class TakeContainer extends Component {


    onRatingSet (newRating) {
        console.log("new rating for take " + this.props.take.id + ": " + newRating);
        //would do an AJAX request here to update rating on this take using its id...
    }

    //other functions here for dealing with new audio comments recorded, etc

    // Retrieves author information from the database
    findAuthor() {

            axios.get('http://172.19.145.91:8000/api/users/').then((results => {

                for (let i = 0; i < results.data.length; i++) {
                    if (results.data[i].id === this.props.take.user) {
                        author = results.data[i].name
                    }
                }
            }))

    }

    render () {

        //console.log('location finder', this.props)
        return (


            <div className="take">
                <div>
                    {this.findAuthor()}
                    <strong>Take {this.props.count} by <font color="blue">{author}</font> on [date]</strong>
                    <Star rating={this.props.take.rating} onChange={this.onRatingSet.bind(this)}/>
                    <AudioComponent
                        src={'http://172.19.145.91:8000/api/stream/' + this.props.take.take.location}
                    />
                </div>
            </div>
        );
    }
}

TakeContainer.propTypes = {
    take: TakePropTypes
};

export default TakeContainer;
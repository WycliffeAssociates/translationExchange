/**
 * Created by DennisMarchuk on 6/29/2017.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactStars from 'react-stars';
import ReactRating from 'react-rating';
import {Segment} from "semantic-ui-react";

export class Star extends Component{

    render(){
        return (
            <Segment compact>
                <ReactStars count={3} onChange={this.props.onChange} size={24} color2={'#ffd700'} half={false} value={this.props.rating}/>
            </Segment>



                );
    }

    //npm install react-stars --save
    //if it does not work run this. Run npm first, only run yarn if npm does not work
    //yarn add react-stars-ie
    //https://www.npmjs.com/package/react-stars-ie
}

Star.propTypes = {
    rating: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
};

export default Star



// <Segment compact>
// <ReactStars count={3} onChange={this.props.onChange} size={24} color2={'#ffd700'} half={false} value={this.props.rating}/>
// </Segment>
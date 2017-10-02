/*
    Shows a loading spinner if the data for a display component is still being loaded.
    Otherwise, displays the component. Use it like this:
        <LoadingDisplay loaded={this.state.dataLoaded}
                        error={this.state.errorMessage}
                        retry={this.requestDataFunction}>
            <DataDisplayComponent data={this.state.data}/>
        </LoadingDisplay>
 */

import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import {Button} from "semantic-ui-react";
import LoadingGif from '../../images/loading.gif';

class LoadingDisplay extends Component{
    render(){
        if (this.props.error) {
            return (
                <Button
                    label={{as: 'a', basic: true, pointing: 'right', content: "There was a problem loading the data: " + this.props.error.message}}
                    labelPosition='left'
                    onClick={this.props.retry}
                    content='Retry'
                />
            );
        } else {
            if (this.props.loaded) {
                //if there's only one child, then you don't have to put the extra div around it
                if (this.props.children.length > 1) {
                    return (
                        <div>{this.props.children}</div>
                    );
                } else {
                    return React.Children.only(this.props.children);
                }
            } else {

                return (

                   <div style = {styles.loading}>
                     <h1>{this.props.displayText.loading}</h1>
                  <img src={LoadingGif} alt="Loading..." width="66" height="66"/>
                   </div>
                );

            }
        }
    }
}

LoadingDisplay.propTypes = {
    loaded: PropTypes.bool.isRequired, //is the data loaded and ready to display?
    error: PropTypes.object.isRequired, //empty if there is no error, error message if there is a problem
    retry: PropTypes.func.isRequired //function to call when retrying data request
};

const styles = {
    loading:{
      display: 'flex',
      height: 400,
      width: '100%',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }

};


const mapStateToProps = state => {

const{ displayText } = state.geolocation;

return{displayText};

};


export default connect (mapStateToProps) (LoadingDisplay);

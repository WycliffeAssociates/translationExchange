import React, { Component } from 'react';
import Time from './time';
import {MarkerButton} from './buttons';


class TimeContainer extends Component {


  render() {

    return (

      <div  style={styles.container}>
        <div style={styles.markerContainer}>
          <MarkerButton onClick= {this.props.markerBtnClicked} />
        </div>

        <div style={styles.timeContainer} >
          <Time time={this.props.updatedTime} />
          <div style = {{marginLeft: 5, marginRight: 5}}>/</div>
          <Time time={this.props.audioLength} />
        </div>
      </div>


    );

  }



}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    color: '#fff',
    width: 120,
    height: '100%',
  },

  timeContainer: {
    marginTop: 9,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',

  },
  nameContainer: {
    justifyContent: 'center',
  },
  markerContainer: {
    justifyContent: 'center',
  },

};




export default TimeContainer;

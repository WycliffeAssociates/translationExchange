import React, {Component} from 'react';
// import { Icon } from "semantic-ui-react";
import {YesButton} from '../../../pages/Login/components/YesButton';
import {RedoButton} from '../../../pages/Login/components/RedoButton';

class BottomButtons extends Component {


  render() {


    return (
      <div style= {styles.container}>
        <RedoButton onClick={this.props.redo} />
        <YesButton  onClick={this.props.done} />
      </div>
    );
  }
}


const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: '12%',
  },
  redoBtn: {
    backgroundColor: 'transparent',
    borderColor: '#009CFF',
    borderRadius: '5%',
  },
  yesBtn: {
    backgroundColor: '#009CFF',
    borderRadius: '5%',
  },

};




export default BottomButtons;

import React, {Component} from 'react';
import { Icon } from "semantic-ui-react";

class BottomButtons extends Component {


render() {
    return (
      <div style= {styles.container}>
        <button  onClick={()=> this.props.redo()} style= {styles.redoBtn}> Redo   <Icon size="small" name='undo' />  </button>
        <button onClick={()=> this.props.done} style= {styles.yesBtn}> Yes  <Icon size="small" name='checkmark' /> </button>
      </div>
    )
}


}


const styles = {
  container:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width:'50%',
    marginTop:'3%'
  },
  redoBtn:{
    backgroundColor:'transparent',
    borderColor:'#009CFF',
    borderRadius:'5%'
  },
  yesBtn:{
    backgroundColor:'#009CFF',
    borderRadius:'5%'
  }

}




export default BottomButtons;

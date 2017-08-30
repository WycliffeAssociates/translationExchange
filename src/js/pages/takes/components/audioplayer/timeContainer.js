import React, { Component } from 'react';
import Time from './time';
import {MarkerButton} from './buttons';


class TimeContainer extends Component {

constructor(props){
super(props);

this.state = {currentName: '', max: 0, pointer: 0}



}


 componentWillReceiveProps(nextProps) {
   let i = this.state.pointer;




   this.setState({
                  max: nextProps.audioName.length,
                  currentName: nextProps.audioName[this.state.pointer]
    });


   if (this.props.nextAudio){

      
      if(this.state.pointer === this.state.max-1){

        i = 0;
       this.setState({pointer: 0, currentName: nextProps.audioName[0]});

      }


   }


 }












render(){

const name = this.state.currentName;





  return(

    <div  style={styles.container}>
             <div style={styles.markerContainer}>
              <MarkerButton onClick= {this.props.markerBtnClicked} />
            </div>

            {/* <div style={styles.nameContainer} >{name}</div> */}
            <div style={styles.timeContainer} >
              <Time time={this.props.updatedTime} />
              <div style = {{marginLeft: 5, marginRight:5}}>/</div>
              <Time time={this.props.audioLength} />
            </div>
          </div>


  );

}



}

const styles = {
  container:{
    display: 'flex',
    flexDirection:'column',
    justifyContent: 'center',
    color: "#fff",
    width: 120,
    height: '100%'

  },

   timeContainer:{
      marginTop: 9,
       display: 'flex',
       flexDirection: 'row',
       justifyContent: 'center'

   },
   nameContainer:{
           justifyContent: 'center'

   },
   markerContainer:{
        justifyContent: 'center'
   }

}




export default TimeContainer;

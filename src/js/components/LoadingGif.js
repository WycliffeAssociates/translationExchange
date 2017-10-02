import React, { Component } from 'react';
import { connect } from "react-redux";
import loadingGif from '../../images/loading.gif';

class LoadingGif extends Component {
    render () {
        return (
          <div style = {styles.loading}>
            <h1>{this.props.displayText.loading}</h1>
         <img src={LoadingGif} alt="Loading..." width="66" height="66"/>
          </div>
        );
    }
}

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


export default connect (mapStateToProps) (LoadingGif);

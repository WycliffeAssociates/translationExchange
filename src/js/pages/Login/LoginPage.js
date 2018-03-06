import React from 'react';
import {connect} from 'react-redux';
import Welcome from './components/Welcome.js';
import 'css/Login.css';

class ComponentName extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {

    return (
      <div className="LoginDiv">

        <Welcome />

      </div>
    );
  }

}


const mapDispatchToProps = (dispatch) => ({dispatch});

// const mapStateToProps = ({reducer1, reducer2}) => ({
//
//   // all the state variables that you want to map to props
// });


export default connect(mapDispatchToProps)(ComponentName);

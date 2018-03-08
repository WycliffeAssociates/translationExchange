import React from 'react';
import {connect} from 'react-redux';
import WelcomeComponent from './components/WelcomeComponent.js';
import 'css/Login.css';

class Welcome extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {

    return (
      <div className = "container">
        <div className="backgroundOverlayLogin">

          <WelcomeComponent {...this.props} />

        </div>

      </div>
    );
  }

}


const mapDispatchToProps = (dispatch) => ({dispatch});

// const mapStateToProps = ({reducer1, reducer2}) => ({
//
//   // all the state variables that you want to map to props
// });


export default connect(mapDispatchToProps)(Welcome);

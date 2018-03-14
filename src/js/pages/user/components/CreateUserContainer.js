
import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Card } from 'semantic-ui-react';
import 'css/create.css';
import CreateUser from './CreateUser';
import {bindActionCreators} from 'redux';
import { createUser } from '../../../actions/UserActions';


class CreateUserContainer extends Component {

  render() {
    return (
      <div className="background" style= {styles.container} >

        <Card style={styles.card}>
          <CreateUser {...this.props} />
        </Card>

      </div>

    );
  }

}

const styles ={
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw',

  },
  card: {
    width: '30vw',
    height: '40vw',
    boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.4)',
    borderRadius: '2%',
    minWidth: 469 ,
    maxWidth: 1680,
  },
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({createUser}, dispatch)
}


export default connect(null, mapDispatchToProps) (CreateUserContainer);

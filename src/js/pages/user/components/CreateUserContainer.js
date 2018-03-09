
import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Card } from 'semantic-ui-react';
import 'css/create.css';
import CreateUser from './CreateUser';
import {bindActionCreators} from 'redux';
import * as UserActionCreators from '../../../actions/UserActions';


class CreateUserContainer extends Component {

  constructor(props) {
    super(props);

    const {dispatch} = this.props;
    console.log(dispatch, 'dispatch');

    this.boundUserActionCreators = bindActionCreators(UserActionCreators, dispatch);
    console.log(this.boundUserActionCreators);
  }



  render() {
    return (
      <div className="background" style= {styles.container} >

        <Card style={styles.card}>
          <CreateUser {...this.boundUserActionCreators} {...this.props} />
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

const mapDispatchToProps = ({dispatch}) => ({dispatch});

export default connect(mapDispatchToProps) (CreateUserContainer);


import React, { Component } from 'react';
import { Card } from 'semantic-ui-react'
import 'css/create.css';
import CreateUser from './CreateUser';


class CreateUserContainer extends Component {



  render() {
    return (
      <div className="background" style= {styles.container} >

        <Card style={styles.card}>
          <CreateUser />
        </Card>

      </div>

    );
  }

}

const styles ={
  container:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  card:{
    width: '30%',
    height: '90%',
    boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.4)',
    borderRadius: '2%',
    minWidth: 469 ,
    maxWidth: 1680
  }
}


export default CreateUserContainer;

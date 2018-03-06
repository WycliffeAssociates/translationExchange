import React from 'react';
import UserCard from './components/UserCard';
import NewUserCard from './components/NewUserCard';
import {Grid, Card} from 'semantic-ui-react';
export default class ComponentName extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      users: [1,2,3,4,5,6,7,8,90,12,23,34,45,23],
    };
  }


  render() {

    return (
      <div style={{padding: '3vw', background: 'linear-gradient(to bottom right, #069DD5, #50B2D6)', height: 'inherit', width: '100vw'}}>
        <Grid columns={16}>

          <Grid.Column width ={3}>
            <NewUserCard />
          </Grid.Column >
          {
            this.state.users.map((i)  => {

              return (
                <Grid.Column width={3}>
                  <UserCard key={i} srcNumber={i} />
                </Grid.Column>

              );})

          }
          <Grid.Column width ={3}>
            <Card raised color={'teal'} image={require('../../../images/default-identicon.png')} description ={'this is it'} style={{borderRadius: '20px', overflow: 'hidden'}} />
          </Grid.Column >




        </Grid>

      </div>


    );

  }

}

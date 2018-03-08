import React from 'react';
import UserCard from './components/UserCard';
import NewUserCard from './components/NewUserCard';
import {Grid} from 'semantic-ui-react';
export default class ComponentName extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      users: [1,2,3,4,5,6,7,8,90,12,23,34,45,23],
    };
  }


  render() {

    return (
      <div className= "usersContainer">

        <h2 className={'pageHeader'}> Available Users </h2>

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




        </Grid>

      </div>


    );

  }

}

import React from 'react';
import UserCard from './components/UserCard';
import NewUserCard from './components/NewUserCard';
import {Grid} from 'semantic-ui-react';
import {connect} from 'react-redux';

class AvailableUsers extends React.Component {

  constructor(props) {
    super(props);

  }


  render() {

    console.log(this.props);


    return (
      <div className="container">
        <div className= "backgroundOverlayUsers">

          <h2 className={'pageHeader'}> Available Users </h2>

          <Grid columns={16}>

            <Grid.Column width ={3}>
              <NewUserCard {...this.props} />
            </Grid.Column >
            {
              // this.state.users.map((i)  => {
              //
              //return (
              <Grid.Column width={3}>
                <UserCard  hash={this.props.users[0].hash} />
              </Grid.Column>

              //);})

            }
          </Grid>

        </div>
      </div>



    );

  }

}

const mapStateToProps = ({user}) => ({
  users: user.users,

});

export default connect (mapStateToProps)(AvailableUsers);

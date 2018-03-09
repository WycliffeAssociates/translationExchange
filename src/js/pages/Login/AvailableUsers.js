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
    console.log(this.props.users);


    return (
      <div className="container">
        <div className= "backgroundOverlayUsers">

          <h2 className={'pageHeader'}> Available Users </h2>

          <Grid columns={16}>

            <Grid.Column width ={3}>
              <NewUserCard {...this.props} />
            </Grid.Column >

            {
              this.props.users.length>=2? this.props.users.map((user,index)  => {

                return (
                  <Grid.Column width={3}>
                    <UserCard  key={user} id={index} hash={user.hash} recording={user.recording} />
                  </Grid.Column>
                );}) :   <Grid.Column width={3}> <UserCard id={0} key={0} hash={this.props.users[0].hash} /> </Grid.Column>

            }
          </Grid>

        </div>
      </div>



    );

  }

}

const mapStateToProps = ({user}) => ({
  users: user.users,
  recording: user.recording

});

export default connect (mapStateToProps)(AvailableUsers);

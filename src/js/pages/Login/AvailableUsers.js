import React from 'react';
import UserCard from './components/UserCard';
import NewUserCard from './components/NewUserCard';
import {Grid} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchUsers} from '../../actions';

class AvailableUsers extends React.Component {


  componentWillMount() {
    this.props.fetchUsers();
  }

  render() {


    return (
      <div className="container">
        <div className= "backgroundOverlayUsers">

          <h2 className={'pageHeader'}> Available Users </h2>

          <Grid columns={16}>

            <Grid.Column width ={3}>
              <NewUserCard {...this.props} />
            </Grid.Column >

            {
              this.props.users.length>0? this.props.users.map((user,index)  => {

                return (
                  <Grid.Column width={3}>
                    <UserCard  key={user} id={index} user={user} />
                  </Grid.Column>
                );}) :   ''

            }
          </Grid>

        </div>
      </div>



    );

  }

}

const mapStateToProps = state => {
  const { users } = state.user;
  return {users}
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {  fetchUsers }, dispatch);
};

export default connect (mapStateToProps, mapDispatchToProps )(AvailableUsers);

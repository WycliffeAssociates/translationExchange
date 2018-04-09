import React from 'react';
import UserCard from './components/UserCard';
import NewUserCard from './components/NewUserCard';
import {Grid} from 'semantic-ui-react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {bindActionCreators} from 'redux';
import {fetchUsers, identiconLogin} from '../../actions';
import img from '../../../assets/images/background-pattern.png';
class AvailableUsers extends React.Component {


  componentWillMount() {
    this.props.fetchUsers();
  }

  render() {

    const {users} = this.props;
    const backgroundFill = users.length !==0? true: false;

    return (
      <Container backgroundFill={backgroundFill}>

        <h2 style={{marginBottom: '5vw'}}> Available Users </h2>

        <Grid columns={16}>

          <Grid.Column width ={3}>
            <NewUserCard {...this.props} />
          </Grid.Column >

          {
            users.length>0? users.map((user,index)  => {

              return (
                <Grid.Column width={3}>
                  <UserCard  key={user} id={index} user={user} {...this.props} />
                </Grid.Column>
              );}) :   ''

          }
        </Grid>

      </Container>



    );

  }

}

const Container = styled.div`
  background-image: url(${img}), linear-gradient(to bottom right, #969595 , #969595 ) ;
  padding: 5vw;
  height: ${props => props.backgroundFill? 'auto': '100vh'};
  width: 100vw;
  text-align: center;
  color: white;

`;

const mapStateToProps = state => {
  const { users } = state.user;
  return {users};
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {  fetchUsers, identiconLogin }, dispatch);
};

export default connect (mapStateToProps, mapDispatchToProps )(AvailableUsers);

import React from 'react';
import UserCard from './components/UserCard';
import NewUserCard from './components/NewUserCard';
import Loading from '../../components/Loading';
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

        {
          this.props.loading?

            <Loading height = "100vh" />

            :

            <Grid columns={16}>

              <Grid.Column width ={3}>
                <NewUserCard {...this.props} />
              </Grid.Column >

              {
                users.length>0? users.map((user,index)  => {
                  return (
                    user.is_social? '' :
                      <Grid.Column width={3}>
                        <UserCard  key={user} id={index} user={user} {...this.props} />
                      </Grid.Column>
                  );}) :   ''

              }
            </Grid>

        }

      </Container>



    );

  }

}

const Container = styled.div`
  background-image: url(${img}), linear-gradient(to bottom right, #0076FF, #00C5FF) ;
  padding: 5vw;
  height: ${props => props.backgroundFill? 'auto': '100vh'};
  text-align: center;
  color: white;
  width: 100vw;

`;

Container.displayName = 'Container';

const mapStateToProps = state => {
  const { users, loading } = state.user;
  return {users, loading};
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {  fetchUsers, identiconLogin }, dispatch);
};

export default connect (mapStateToProps, mapDispatchToProps )(AvailableUsers);

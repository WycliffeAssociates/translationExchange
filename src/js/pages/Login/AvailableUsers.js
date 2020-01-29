import React from 'react';
import UserCard from './components/UserCard';
import NewUserCard from './components/NewUserCard';
import Loading from '../../components/Loading';
import {Grid} from 'semantic-ui-react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {bindActionCreators} from 'redux';
import {fetchUsers, identiconLogin} from '../../actions';

export class AvailableUsers extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.sortedUsers = this.sortedUsers.bind(this);
  }

  handleClick(clickSrc) {

    if (clickSrc === 'download') {
      this.props.history.push('/download');
    }

  }

  componentWillMount() {
    const {history, fetchUsers} = this.props;
    fetchUsers(history);
  }

  sortedUsers() {
    const {users} = this.props;
    
    users.forEach((element) => {
      element["timestamp"] = localStorage.getItem("login:" + element.icon_hash);
    });
    
    users.sort((a, b) => {
      if(a.timestamp == null) return 1;
      if(b.timestamp == null) return -1;

      return b.timestamp - a.timestamp;
    });
    
    return users;
  }

  render() {

    const {txt} = this.props;

    return (
      <Container className="pageBackground">

        <DownloadLink onClick={()=> this.handleClick('download')}>
          {txt.get("download")}
        </DownloadLink>

        <h2 style={{marginBottom: '5vw'}}> {txt.get("availableUsers")} </h2>

        {
          this.props.loading?

            <Loading txt={txt} height = "90vh" />

            :

            <Grid columns={16} style={{marginLeft: '7.5vw'}}>

              <Grid.Column width ={3}>
                <NewUserCard {...this.props} />
              </Grid.Column >

              {
                this.sortedUsers().length > 0? this.sortedUsers().map((user,index)  => {
                  return (
                    user.is_social? '' :
                      <Grid.Column width={3} key={user.id}>
                        <UserCard id={index} user={user} {...this.props} />
                      </Grid.Column>
                  );}) : ''

              }
            </Grid>

        }

      </Container>



    );

  }

}

const Container = styled.div`
  padding: 5vw;
  text-align: center;
  color: white;

`;
Container.displayName = 'Container';

const DownloadLink = styled.a`
    text-decoration: underline !important;
    color: #ffffff !important;
    font-size: 20px;
    display: block;
    margin-top: 30px;
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 50px;
`;
DownloadLink.displayName = 'DownloadLink';

const mapStateToProps = state => {
  const { users, loading } = state.user;
  const {txt} = state.geolocation;
  return {users, loading, txt};
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {  fetchUsers, identiconLogin }, dispatch);
};

export default connect (mapStateToProps, mapDispatchToProps )(AvailableUsers);

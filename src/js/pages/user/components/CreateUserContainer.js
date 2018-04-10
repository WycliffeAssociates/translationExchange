import React, { Component } from 'react';
import {connect} from 'react-redux';
import 'css/create.css';
import CreateUser from './CreateUser';
import UserCreated from './UserCreated';
import styled from 'styled-components';
import {bindActionCreators} from 'redux';
import { createUser, resetUserCreated } from '../../../actions/UserActions';


export class CreateUserContainer extends Component {


  constructor(props) {
    super(props);

    //const {dispatch} = this.props;

    this.handleClick = this.handleClick.bind(this);
  }

  componentWillUnmount() {
    this.props.resetUserCreated();
  }

  handleClick() {
    this.props.history.push({ pathname: "/users" });
  }

  render() {
    const { userCreated } = this.props;
    return (
      <div className="pageBackground">
        <Label onClick={() => this.handleClick()}>
          <i
            className="material-icons"
            style={{ fontSize: "1.7vw", verticalAlign: "middle" }}
          >
            arrow_back
          </i>
          Back to Login
        </Label>

        <Container>
          <Card>
            {userCreated ? (
              <UserCreated {...this.props} />
            ) : (
              <CreateUser {...this.props} />
            )}
          </Card>
        </Container>
      </div>
    );
  }
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 3vw;
`;
Container.displayName= 'Container';

const Label = styled.label`
  color: white;
  font-size: 1.2vw;
  padding: 0.5vw 0.5vw;
  border: none;
  text-decoration: underline;
  cursor: pointer;
`;
Label.displayName = 'Label';

const Card = styled.div`
  width: 33vw;
  height: 40vw;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.4);
  border-radius: 2%;
  min-width: 469;
  max-width: 1680;
  padding-bottom: 1.5vw;
  background-color: white;
  overflow: hidden;
`;
Card.displayName = 'Card';

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ createUser, resetUserCreated }, dispatch);
};

const mapStateToProps = state => {
  const { hash, audioName, userCreated, loading } = state.user;
  return { hash, audioName, userCreated, loading };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  CreateUserContainer
);

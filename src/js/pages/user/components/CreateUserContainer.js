import React, { Component } from 'react';
import {connect} from 'react-redux';
import CreateUser from './CreateUser';
import UserCreated from './UserCreated';
import styled, {keyframes} from 'styled-components';
import {fadeIn} from 'react-animations';
import {bindActionCreators} from 'redux';
import { createUser, resetUserCreated, patchUser } from '../../../actions/UserActions';


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
    this.props.history.push({ pathname: '/users' });
  }

  render() {
    const { userCreated } = this.props;
    return (
      <PageContainer className ="pageBackground">
        <Label onClick={() => this.handleClick()}>
          <i
            className="material-icons"
            style={{ fontSize: "40px", verticalAlign: "middle" }}
          >
            arrow_back
          </i>
          Back to Login
        </Label>

        <CardContainer>
          <Card>
            {userCreated ? (
              <UserCreated {...this.props} />
            ) : (
              <CreateUser {...this.props} />
            )}
          </Card>
        </CardContainer>
      </PageContainer>
    );
  }
}

const fadeInAnimation = keyframes`${fadeIn}`;

const PageContainer = styled.div`
`;
PageContainer.displayName = 'PageContainer';

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 3vw;
`;
CardContainer.displayName= 'CardContainer';

const Label = styled.label`
  color: white;
  font-size: 20px;
  padding: 0.5vw 0.5vw;
  border: none;
  text-decoration: underline;
  cursor: pointer;
  align-self: flex-start;
`;
Label.displayName = 'Label';

const Card = styled.div`
  width: 590px;
  height: 800px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.4);
  border-radius: 2%;
  min-width: 469px;
  max-width: 1200px;
  padding-bottom: 1.5vw;
  background-color: white;
  overflow: hidden;
  animation: ${fadeInAnimation} .3s ease-in;
`;
Card.displayName = 'Card';

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ createUser, resetUserCreated, patchUser }, dispatch);
};

const mapStateToProps = state => {
  const { hash, audioName, userCreated, loading, socialLogin, tempUserId } = state.user;
  return { hash, audioName, userCreated, loading, socialLogin, tempUserId };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  CreateUserContainer
);

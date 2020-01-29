import React, { Component } from 'react';
import {connect} from 'react-redux';
import CreateUser from './CreateUser';
import UserCreated from './UserCreated';
import styled, {keyframes} from 'styled-components';
import {fadeIn} from 'react-animations';
import {bindActionCreators} from 'redux';
import { createUser, resetUserCreated, patchUser } from '../../../actions';


export class CreateUserContainer extends Component {


  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    
  }

  componentWillUnmount() {
    this.props.resetUserCreated();
  }

  handleClick() {
    this.props.history.push({ pathname: '/welcome' });
  }

  render() {
    const { userCreated, txt } = this.props;
    return (
      <PageContainer className ="pageBackground">
        <Label onClick={() => this.handleClick()}>
          <i
            className="material-icons"
            style={{ fontSize: "40px", verticalAlign: "middle" }}
          >
            arrow_back
          </i>
          {txt.get("backToLogin")}
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
  padding: 3vw;
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
  width: 40vw;
  height: 100%;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.4);
  border-radius: 2%;
  background-color: white;
  overflow: hidden;
  animation: ${fadeInAnimation} .3s ease-in;
  padding-bottom: 2vw;

  @-moz-document url-prefix() {
    height: 800px;
    width: 590px;
  }
`;
Card.displayName = 'Card';

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ createUser, resetUserCreated, patchUser }, dispatch);
};

const mapStateToProps = state => {
  const { hash, audioName, userCreated, loading, socialLogin, tempUserId } = state.user;
  const {txt} = state.geolocation;
  return { hash, audioName, userCreated, loading, socialLogin, tempUserId, txt };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  CreateUserContainer
);

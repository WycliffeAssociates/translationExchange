
import React, { Component } from 'react';
import {connect} from 'react-redux';
import 'css/create.css';
import CreateUser from './CreateUser';
import styled from 'styled-components';
import {bindActionCreators} from 'redux';
import * as UserActionCreators from '../../../actions/UserActions';


class CreateUserContainer extends Component {

  constructor(props) {
    super(props);

    const {dispatch} = this.props;

    this.boundUserActionCreators = bindActionCreators(UserActionCreators, dispatch);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.history.push({pathname: '/users'});
  }



  render() {
    return (
      <div className="pageBackground">

        <Label onClick={this.handleClick}>
          <i className="fa fa-hand-point-left fa-fw" /> Back to Login
        </Label>

        <Container>
          <Card>
            <CreateUser {...this.boundUserActionCreators} {...this.props} />
          </Card>

        </Container>
      </div>

    );
  }
}

const  Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 3vw;
`;

const Label = styled.label`
  color: white;
  font-size: 1.2vw;
  padding: 0.5vw 0.5vw;
  border: none;
  text-decoration: underline;
  cursor: pointer;
`;

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


const mapDispatchToProps = ({dispatch}) => ({dispatch});

export default connect(mapDispatchToProps) (CreateUserContainer);

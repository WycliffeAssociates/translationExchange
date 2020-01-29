import React from 'react';
import styled, {keyframes} from 'styled-components';
import {bounceIn} from 'react-animations';

export default class NewUserCard extends React.Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }


  render() {

    return (
      <NewUserCardContainer  onClick={this.handleClick}>


        <Card>


          <AddUser> <i className="material-icons" style={{fontSize: '7vw',transform: `scale(-1,1)`}}>person_add</i></AddUser>
          <CardLabel> {this.props.txt.get("newUser")} </CardLabel>


        </Card>

      </NewUserCardContainer>
    );
  }


  handleClick() {
    this.props.history.push({pathname: '/users/registration'});
  }

}

const bounceInAnimations =keyframes`${bounceIn}`;

const NewUserCardContainer = styled.div`

`;
NewUserCardContainer.displayName = 'NewUserCardContainer';


const Card= styled.div`

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 18vw;
    width: 13vw;
    border-radius: 1.5vw;
    box-shadow: 3px 4px 5px rgba(0,0,0,0.6);
    overflow: hidden;
    background-color: white;
    padding: 2vw 3.5vw;
    cursor: pointer;
    animation: ${bounceInAnimations} 2s ease-in;

  `;
Card.displayName = 'Card';


const AddUser = styled.div`

    color: #009CFF;
    border: none;
    background-color: white;
    align-self: flex-start;
    margin-bottom: 10vh-3vw;
  `;
AddUser.displayName = 'AddUser';

const CardLabel = styled.label`
    color: #009CFF;
    font-size: 1.15vw;
    text-decoration: underline;
    cursor: pointer;
    align-self: flex-end;
  `;
CardLabel.displayName = 'CardLabel';

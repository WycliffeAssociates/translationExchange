import React from 'react';
import styled from 'styled-components';

export default class NewUserCard extends React.Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }


  render() {

    return (
      <NewUserCardContainer  onClick={this.handleClick}>


        <Card>


          <AddUser> <i className="fa fa-user-plus" /> </AddUser>
          <CardLabel> New User </CardLabel>


        </Card>

      </NewUserCardContainer>
    );
  }


  handleClick() {
    this.props.history.push({pathname: '/users/registration'});
  }

}



const NewUserCardContainer = styled.div`
`;
NewUserCardContainer.displayName = 'NewUserCardContainer';


const Card= styled.div`

    text-align: center;
    height: 18vw;
    width: 13vw;
    border-radius: 1.5vw;
    box-shadow: 3px 4px 5px rgba(0,0,0,0.6);
    overflow: hidden;
    background-color: white;
    padding: 2vw 3.5vw;
    cursor: pointer;

  `;
Card.displayName = 'Card';


const AddUser = styled.div`

    color: #009CFF;
    margin-bottom: 1.5vw;
    border: none;
    font-size: 7vw;
    background-color: white;
    margin-left: -0.5vw;
  `;
AddUser.displayName = 'AddUser';

const CardLabel = styled.label`
    color: #009CFF;
    font-size: 1.35vw;
    text-decoration: underline;
    cursor: pointer;
  `;
CardLabel.displayName = 'CardLabel';

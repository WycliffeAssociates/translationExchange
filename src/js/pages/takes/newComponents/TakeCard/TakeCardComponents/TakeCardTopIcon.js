import React from 'react';
import styled from 'styled-components';

export default class TakeCardTopIcon extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {

    return  (
      <TopBar>
        <DragIcon>
          <i className = "fa fa-bars" />
        </DragIcon>

        <CardInfo>
          <h3 style={{alignSelf: 'center'}}> {this.props.displayText.take} {this.props.count} </h3>
          <p style={{color: 'lightgray', fontStyle: 'italic', fontWeight: '100', marginTop: '-0.8vw'}}> 03/13/17 </p>
        </CardInfo>

        <Icon  id="user" data-jdenticon-value={this.props.users.loggedInUser? this.props.users.loggedInUser: 'random'} />
      </TopBar>

    );
  }

}

const TopBar = styled.div`
  //height: 15%;
  display: flex;
  flex-direction: row;
  //align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;

`;

const DragIcon = styled.button`
  border: none;
  font-size: 1.5vw;
  color: gray;
  background: none;

`;

const CardInfo = styled.div`
  margin-top: 0.8vw;
  text-align: center;
`;

const Icon = styled.svg`
  height: 2vw;
  width: 2w;
  margin-top: 0.6vw;
  `;

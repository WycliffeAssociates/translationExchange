import React from 'react';
import jdenticon from 'jdenticon';
import styled from 'styled-components';
//import {Card} from 'semantic-ui-react';

export default class UserCard extends React.Component {

  constructor(props) {
    super(props);

  }

  componentDidMount() {
    jdenticon.update(`#canvas${this.props.id}` , this.props.user.hash);
  }


  render() {
    var key= this.props.id? this.props.id: 0;
    let {user} = this.props;
    console.log(user.hash);
    return (


      <UserCardContainer>
        <Card>

          <ImageContainer>
            <Image id={`canvas${key}`} data-jdenticon-value={user.hash} />

          </ImageContainer>

          <CardOptions>
            <PlayButton onClick={() => this.handleClick(user.recording)}> <i className="fa fa-play"  /> </PlayButton>

          </CardOptions>
        </Card>

      </UserCardContainer>
    );
  }

}


const UserCardContainer = styled.div`
  /* background: linear-gradient(to bottom right, rgba(0,118,255,0.5), rgba(0,197,255,0.5)); */
  // height: 100vh;
  // width: 100vw;
`;

const Card= styled.div`
    text-align: center;
    height: 18vw;
    width: 13vw;
    border-radius: 1.5vw;
    box-shadow: 3px 4px 5px rgba(0,0,0,0.6);
    overflow: hidden;
    background-color: white;
`;

const ImageContainer = styled.div`
    padding: 1.5vw 0.5vw;
`;

const Image= styled.svg`
    height: 10vw;
    width: 10vw;
`;

const PlayButton = styled.button`
    color: white;
    border: none;
    height: 4vw;
    width: 15vw;
    margin-left: -1.5vw;
    margin-top: -0.7vw;
    display: inline-block;
    background-color: #009CFF;
    padding: 0vw 0vw;
    font-size: 2vw; //in the font awesome library the font size ends up controlling the size of the icon
  `;

const CardOptions= styled.div`

    background: #009CFF;
    width: inherit;
    padding: 1vw;
    overflow: hidden;
    text-align: left;
  `;

const SignOutButton = styled.div`
    display: inline-block;
    color: white;
    border: none;
    background-color: #009CFF;
    height: 3.5vw;
    width: 7vw;
    padding-left: 2vw;
    font-size: 2vw; //in the font awesome library the font size ends up controlling the size of the icon
`;

import React from 'react';
import jdenticon from 'jdenticon';
import ReactPlayer from 'react-player';
import styled,  { keyframes } from 'styled-components';
import { pulse } from 'react-animations';
//import {Card} from 'semantic-ui-react';
//

export default class UserCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      playing: false,
    };
    this.play = this.play.bind(this);
    this.ended = this.ended.bind(this);
    this.generateSVG = this.generateSVG.bind(this);
  }

  componentDidMount() {
    jdenticon.update(`#canvas${this.props.id}` , this.props.user.hash);
  }

  generateSVG() {
    return (jdenticon.toSvg(this.props.user.hash, '10vw'));
  }


  play() {

    this.setState({playing: true});
  }

  ended() {
    this.setState({playing: false});
  }
  render() {
    var key= this.props.id? this.props.id: 0;
    var svg = jdenticon.toSvg(this.props.user.hash);
    console.log(svg);
    const {recording, hash} = this.props.user;
    const blob = recording ? recording : {blobUrl: 'none'} ;
    const {playing} = this.state;
    let icon = 'fa fa-play';
    if (playing) {
      icon ='fa fa-volume-up';
    }

    return (


      <UserCardContainer>
        <PulseEffect animate={playing}>
          <Card>

            <ImageContainer>
              <Image key={key} id={`canvas${key}`} data-jdenticon-value={hash} />
            </ImageContainer>

            <CardOptions>
              <ReactPlayer url={blob.blobURL} playing={this.state.playing} onEnded={()=> this.ended()} style={{display: 'none'}} />
              <PlayButton onClick={()=> this.play()}> <i className={`${icon}`}  /> </PlayButton>
            </CardOptions>
          </Card>
        </PulseEffect>
      </UserCardContainer>
    );
  }

}


// keyframes returns a unique name based on a hash of the contents of the keyframes
const pulse_animation = keyframes`${pulse}`;


// Here we create a component that will rotate everything we pass in over two seconds
const PulseEffect = styled.div`
  animation: ${pulse_animation} ${props => props.animate ? '.7s' : '0s' } linear infinite;
`;

const UserCardContainer = styled.div`

`;
UserCardContainer.displayName = 'UserCardContainer';



const Card= styled.div`
    text-align: center;
    height: 18vw;
    width: 13vw;
    border-radius: 1.5vw;
    box-shadow: 3px 4px 5px rgba(0,0,0,0.6);
    overflow: hidden;
    background-color: white;
    cursor: pointer;
`;
Card.displayName = 'Card';


const ImageContainer = styled.div`
    padding: 1.5vw 0.5vw;
     &:hover {
       opacity: 0.8;
  }
`;
ImageContainer.displayName = 'ImageContainer';


const Image= styled.svg`
    height: 10vw;
    width: 10vw;
`;
Image.displayName = 'Image';

const PlayButton = styled.button`
    color: white;
    border: none;
    background-color: #009CFF;
    height: inherit;
    width: inherit;
    font-size: 2vw; //in the font awesome library the font size ends up controlling the size of the icon
    &:hover {
      opacity: 0.9;
      }
    cursor: pointer;

  `;
PlayButton.displayName = 'PlayButton';

const CardOptions= styled.div`
    height: 53%;
    width: inherit;
  `;
CardOptions.displayName = 'CardOptions';


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

SignOutButton.displayName = 'SignOutButton';

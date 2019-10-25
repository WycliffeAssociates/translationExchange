import React from 'react';
import jdenticon from 'jdenticon';
import ReactPlayer from 'react-player';
import styled,  { keyframes } from 'styled-components';
import config from '../../../../config/config';
import { pulse, bounceIn } from 'react-animations';


export default class UserCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      playing: false,
    };
    this.play = this.play.bind(this);
    this.ended = this.ended.bind(this);
  }

  componentDidMount() {
    const {icon_hash} =this.props.user || '' ;
    jdenticon.update(`#canvas${this.props.id}` , icon_hash);
  }

  identLogin(hash) {
    this.props.identiconLogin(hash, ()=>{
      localStorage.setItem("login:" + hash, Date.now());
      this.props.history.push('/projects');
    });
  }

  play() {
    this.setState({playing: true});
  }

  ended() {
    this.setState({playing: false});
  }
  render() {
    var key= this.props.id? this.props.id: 0;
    const {name_audio, icon_hash} = this.props.user || [];
    const audioURL = config.streamingUrl + name_audio;
    const {playing} = this.state;
    let icon = 'play_arrow';
    if (playing) {
      icon ='volume_up';
    }

    return (
      <UserCardContainer>
        <PulseEffect animate={playing}>
          <Card>
            <ImageContainer onClick={()=> this.identLogin(icon_hash)}>
              <Image id={`canvas${key}`} data-jdenticon-hash={icon_hash} />
            </ImageContainer>

            <CardOptions>
              <PlayButton playing={playing} onClick={()=> this.play()}>  <i className="material-icons" style={{fontSize:'3.5vw'}}>{icon}</i></PlayButton>
              <ReactPlayer url={audioURL} playing={this.state.playing} onEnded={()=> this.ended()}  />
            </CardOptions>
          </Card>
        </PulseEffect>
      </UserCardContainer>
    );
  }

}


// keyframes returns a unique name based on a hash of the contents of the keyframes
const pulse_animation = keyframes`${pulse}`;
const bounceInAnimations = keyframes`${bounceIn}`;


// Here we create a component that will rotate everything we pass in over two seconds
const PulseEffect = styled.div`
  animation: ${pulse_animation} ${props => props.animate ? '.7s' : '0s' } linear infinite;
`;

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
    border: solid white;
    animation: ${bounceInAnimations} 1.5s ease-in;
`;

const ImageContainer = styled.div`
    padding: 1.5vw 0.5vw;
    cursor: pointer;
    transition: transform 300ms ease-in-out;
    &:hover {
    transform: scale(1.1);
  }
`;

const Image= styled.svg`
    height: 10vw;
    width: 10vw;
`;

const PlayButton = styled.button`
    color: ${props => props.playing ? '#99ff99' : 'white'  } ;
    border: none;
    height: 4vw;
    width: 15vw;
    margin-left: -2vw;
    margin-top: -0.7vw;
    display: inline-block;
    background-color: #009CFF;
    padding: 0vw 0vw;
    cursor: pointer;
    font-size: 2vw; //in the font awesome library the font size ends up controlling the size of the icon
  `;

const CardOptions= styled.div`

    background: #009CFF;
    width: inherit;
    padding: 1vw;
    overflow: hidden;
    text-align: left;
    border-color: white;
    border-width: 1vw;
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

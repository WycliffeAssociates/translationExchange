import React, {Component} from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import BorderButton from '../../../components/BorderButton';
import {LoadingMp3, LoadingWav} from './';
import { fadeIn } from 'react-animations';
import searchingImg from '../../../../assets/images/searching.png';

export class Downloading extends Component {

  constructor(props) {
    super(props);
    this.state={percentage: 0, previous: 0, counter: 1};
    this.updateProgress = this.updateProgress.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.props.getDownloadProgress(this.props.taskId, this.updateProgress);
    }, 1000);
  }

  updateProgress(percentage, done) {
    this.setState({percentage});
    if (done) {
      clearInterval(this.interval);

    }
  }

  componentWillUnmount() {

    clearInterval(this.interval);
  }


  render() {
    const {type, txt, resetSelected} = this.props;
    const {percentage} = this.state;
    let downloading = false;
    let svg = <LoadingMp3 /> ;
    let textColor = '#009CFF';

    if (percentage === 100) {
      downloading = true;
    }

    if (type === 'wav') {
      svg = <LoadingWav />;
      textColor= '#E56060';
    }


    return (
      <Container textColor ={textColor}>
        {downloading ?
          <Container>
            <Image src={searchingImg} alt="Smiley face" height="10vw" width="10vw" />
            <h1>{txt.get("downloading")}...</h1>
            <p>{txt.get("yourFiles")}  </p>
            <Link to="/projects">
              <BlueButton onClick={()=>resetSelected()}> {txt.get("backToProjects")} <i class="material-icons">book</i> </BlueButton>
            </Link>
          </Container>
          :
          <Container>
            {svg}
            <p>{percentage} %</p>
            <p>{txt.get("generating")} {type}  </p>
            <BorderButton
              onClick ={this.props.cancel} txt={txt.get("cancel")}
              color={'#009CFF'}
              height={'40px'}
              width={'214px'}
              iconSize={'24px'}
              border={'2px'}
              radius={'4px'} />
          </Container>

        }

      </Container>
    );
  }

}

const fadeInAnimation = keyframes`${fadeIn}`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ${fadeInAnimation} .2s ease-in-out;
  i{
    font-size: 450px;
    color:#43B52F;
  }

  p{
    width: 80%;
    text-align: center;
    color:${props => props.textColor}
  }

`;

Container.displayName = 'Downloading';

const Image = styled.img`
  height: 400px;
  width: 400px;
   margin-top: 50px;
`;

const BlueButton = styled.button`
    background: linear-gradient(to bottom, #00C5FF, #009CFF);
    width: 154px;
    height: 40px;
    font-size: 20px;
    font-weight: 100;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: .3s ease-in-out;

    i {
      vertical-align: middle;
      font-size: 16px;
      color:white;
    }

    :hover{
      background: linear-gradient(to bottom, #3BAC29, #64f38c);
      color: #FFF;

    }

    `;

BlueButton.displayName ='CancelButton';

import React, {Component} from 'react';
import styled,{keyframes} from 'styled-components';
import {connect} from 'react-redux';
import { zoomIn } from 'react-animations';
import internetErrorImg from '../../../assets/images/internet_error.png';

export class ErrorPage extends Component {

  componentDidMount() {
    setTimeout(()=>{this.redirect(); }, 3000);
  }

  redirect() {
    this.props.history.push('/welcome');
  }


  render() {

    return (
      <ErrorPageContainer>

        <ImageContainer>
          <Image src={internetErrorImg} alt="Smiley face" height="10vw" width="10vw"/>
          <Text>{this.props.txt.get("internetError")}</Text>
        </ImageContainer>

      </ErrorPageContainer>
    );
  }

}


const ErrorPageContainer = styled.div`
    display: flex;
    position:fixed;
    align-content: center;
    padding:0;
    margin:0;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    min-height: 850px;
    flex-direction: column;
    background-color: #F7F9FE
`;
ErrorPageContainer.displayName = 'ErrorPageContainer';

const zoomOutAnimation =keyframes`${zoomIn}`;

const ImageContainer = styled.div`
  width: 100%;
  padding-top: 2vw;
  display:flex;
  flex-direction: column;
  justify-content:center;
  align-items: center;
  animation: ${zoomOutAnimation} .5s ease-in;
`;
ImageContainer.displayName = 'ImageContainer';

const Image = styled.img`
  height: 35vw;
  width: 54vw;
`;
Image.displayName = 'Image';


const Text = styled.p`
  font-size:2vw;
  width: 54vw;
  text-align: center;
  background-color: #F1F1F1;
  color:#292929;
`;

const mapStateToProps = state => {
  const {txt} = state.geolocation;
  return {txt};
};


export default connect(mapStateToProps)(ErrorPage);

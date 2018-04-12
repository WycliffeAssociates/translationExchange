import React, {Component} from 'react';
import styled,{keyframes} from 'styled-components';
import { zoomIn } from 'react-animations';
import imgError from '../../../assets/images/error_image.png'







class ErrorPage extends Component {

    componentDidMount(){
        setTimeout(()=>{this.redirect(); }, 3000);
    }

    redirect(){
        this.props.history.push('/welcome');
    }


    render() {

        return (
            <ErrorPageContainer>
                <ImageContainer>
                    <Image src={imgError} alt="Smiley face" height="10vw" width="10vw"/>
                </ImageContainer>
            </ErrorPageContainer>
        );
    }

}


const ErrorPageContainer = styled.div`
    display: flex;
    position:fixed;
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

const zoomOutAnimation =keyframes`${zoomIn}`;

const ImageContainer = styled.div`
  width: 100%;
  padding-top: 2vw;
  display:flex;
  justify-content:center;
  animation: ${zoomOutAnimation} .5s ease-in;
`;

const Image = styled.img`
   height: 45vw;
   width: 64vw;
`;






export default ErrorPage;

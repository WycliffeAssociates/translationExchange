
import React from 'react';
import styled from 'styled-components';

const d = 'M300,600V2.5c0,0-0.6-0.1-1.1-0.1c0,0-25.5-2.3-40.5-2.4c-15,0-40.6,2.4-40.6,2.4'+
'c-12.3,1.1-30.3,1.8-31.9,1.9c-2-0.1-19.7-0.8-32-1.9c0,0-25.8-2.3-40.8-2.4c-15,0-40.8,2.4-40.8,2.4c-12.3,1.1-30.4,1.8-32,1.9'+
'c-2-0.1-20-0.8-32.2-1.9c0,0-3.1-0.3-8.1-0.7V800H200z';
export const LoadingMp3 = ({percentage, prevValue}) => (
  <Container>

    <Front>
      <SVG version="1.1" id="logo" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink"
        height= "400px" x="0px" y="0px" space="preserve" >

        <defs>
          <clipPath id="drop">
            <path fill="#FFE" transform="scale(16.75), translate(-5,0)" d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
          </clipPath>
        </defs>

        <g  clipPath="url(#drop)">
          <Fill percentage={percentage} prevValue={prevValue}>
            <WaveShape   width="600px"  fill="#04ACFF" id="waveShape" d={d} />
          </Fill>
        </g>

      </SVG>
    </Front>
    <Background>
      <SVG version="1.1" id="logo" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink"
        height= "400px" x="0px" y="0px" space="preserve" >
        <path fill="#EEEEEE" transform="scale(16.75), translate(-5,0)" d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
      </SVG>
    </Background>
  </Container>
);

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width:100%;
`;

Container.displayName= 'Container';


const Front = styled.div`
  z-index: 1;
`;

const Background = styled.div`
  position:absolute;
`;

const SVG = styled.svg`
`;


const Fill = styled.g`
    animation-name: fillAction;
    animation-iteration-count: infinite;
    animation-timing-function: cubic-bezier(.2, .6, .8, .4);
    animation-duration: 2s;
    animation-fill-mode: forwards;



    @keyframes fillAction {
      from {
        transform: translateY(82%);
      }
      to {
        transform: translateY(10%);
      }
    }


`;

const WaveShape = styled.path`
    animation-name: waveAction;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    animation-duration: 0.6s;
    fill: #04ACFF;
    @keyframes waveAction {
  0% {
    transform: translate(-5px, 0);
  }
  100% {
    transform: translate(0px, 0);
  }
}
`;

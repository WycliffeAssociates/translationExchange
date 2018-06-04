
import React from 'react';
import styled from 'styled-components';
const d = 'M300,600V2.5c0,0-0.6-0.1-1.1-0.1c0,0-25.5-2.3-40.5-2.4c-15,0-40.6,2.4-40.6,2.4'+
'c-12.3,1.1-30.3,1.8-31.9,1.9c-2-0.1-19.7-0.8-32-1.9c0,0-25.8-2.3-40.8-2.4c-15,0-40.8,2.4-40.8,2.4c-12.3,1.1-30.4,1.8-32,1.9'+
'c-2-0.1-20-0.8-32.2-1.9c0,0-3.1-0.3-8.1-0.7V800H200z';
export default () => (
  <Container>
    <Background>
      <SVG version="1.1" id="logo" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink"
        height= "200px" x="0px" y="0px" space="preserve" transform="scale(1.5)" >

        <path fill="#EEEEEE" transform="scale(8.75), translate(5,0)" d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />

      </SVG>
    </Background>
    <Front>
      <SVG version="1.1" id="logo" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink"
        height= "200px" x="0px" y="0px" space="preserve" transform="scale(1.5)" >

        <defs>
          <clipPath id="drop">
            <path fill="#FFE" transform="scale(8.75), translate(5,0)" d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
          </clipPath>
        </defs>

        <g  clipPath="url(#drop)">
          <Fill>
            <WaveShape   width="600px"  fill="#E56060" id="waveShape" d={d} />
          </Fill>
        </g>

      </SVG>
    </Front>


  </Container>
);

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
`
;

const SVG = styled.svg`
`;

const Background = styled.div`
  position: absolute;
`;
const Front = styled.div`

`;


const Fill = styled.g`
    animation-name: fillAction;
    animation-iteration-count: infinite;
    animation-timing-function: cubic-bezier(.2, .6, .8, .4);
    animation-duration: 2s;
    animation-fill-mode: forwards;



    @keyframes fillAction {
      from {
        transform: translateY(92%);
      }
      to {
        transform: translateY(5%);
      }
    }


`;

const WaveShape = styled.path`
    animation-name: waveAction;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    animation-duration: .6s;
    fill: #E56060;
    @keyframes waveAction {
  0% {
    transform: translate(-10px, 0);
  }
  100% {
    transform: translate(0px, 0);
  }
}
`;

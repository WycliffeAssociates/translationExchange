import React from 'react';
import styled from 'styled-components';

export default class VerseMarkers extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {
    const {active} = this.props;
    const markerArray =[];
    let markers = JSON.parse(this.props.markers);

    for (const key in markers) {
      const position = (markers[key]/44100);
      markerArray.push({position: position, verse: key});
    }
    let len = markerArray.length;

    return (
      <Container>
        {
          markerArray.map((marker) => {
            return (
              <Marker active={active} key={marker.verse} len={len} id={marker}> {marker.verse} </Marker>
            );
          })
        }

      </Container>
    );
  }

}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 10px;
`;

const Marker = styled.button`
  width: 33%;
  height: 3vh;
  min-height: 40px;
  color: ${props => props.active? 'black': 'rgba(255,255,255,0.5)'};
  background: ${props => props.active? 'white': '#39414A'};
  border: none;
  border-radius: 20px;
  margin: 2px;
`;

import React from 'react';
import styled from 'styled-components';

export default class VerseMarkers extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {
    const {active, dragPosition} = this.props;
    const markerArray =[];
    let position;
    let markers = JSON.parse(this.props.markers);

    for (const key in markers) {
      position = (markers[key]/44100);
      markerArray.push({position: position, verse: key});
    }
    let len = markerArray.length;

    return (
      <Container>
        {
          markerArray.map((marker) => {
            return (
              <Marker onClick={()=> dragPosition(marker.position)} active={active} key={marker.verse} length={markerArray.length}
                len={len} id={marker}> {marker.verse} </Marker>
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
Container.displayName = 'Container';

const Marker = styled.button`
  width: ${props => 100/props.length+'%'};;
  height: 3vh;
  min-height: 40px;
  color: ${props => props.active? 'black': 'rgba(255,255,255,0.5)'};
  background: ${props => props.active? 'white': '#39414A'};
  border: none;
  border-radius: 20px;
  margin: 2px;
`;
Marker.displayName= 'Marker';

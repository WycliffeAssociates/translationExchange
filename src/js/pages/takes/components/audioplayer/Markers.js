import React from 'react';
import styled from 'styled-components';

class Markers extends React.Component {


  getPosition(position) {
    //  console.log(position)
    this.props.dragPosition(position);            // change name to moveCursor

  }


  render() {
    let verseMarkers = this.props.text;
    const markerLength = verseMarkers.length;
    const position = this.props.translate;
    const {markerTime} = this.props;
    let fontSize= '.7vw';
    let top = '.2vw';
    let shiftLeft = false;

    if (markerLength > 1) {
      shiftLeft = true;
    }
    if (markerLength > 2) {
      fontSize = '.5vw';
      top = '.23vw';
    }

    return (
      <label onClick= {() => this.props.dragPosition(markerTime)}
        style={{position: 'absolute', marginLeft: `${position==0? position-3: position-6}%`, cursor: 'pointer', color: '#009CFF'}}
        width="20px"
        height="45px">
        <i style={{fontSize: '1.6vw'}} className="material-icons" > place</i>
        <VerseNumber top={top} fontSize={fontSize} shiftLeft={shiftLeft}>{this.props.text}</VerseNumber>
      </label>


    );
  }
}

const VerseNumber = styled.div`
  position: absolute;
  top: ${props=> props.top};
  left: ${props => props.shiftLeft ? '.41vw': '.62vw'};
  color:white;
  background-color: #009CFF;
  border-radius: .3vw;
  font-size: ${props=> props.fontSize};
  display: flex;
  align-items: center;
  height: .7vw;


`;

export default Markers;

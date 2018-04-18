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


    if (markerLength > 3) {
      verseMarkers = '';
    }

    return (
      <label onClick= {() => this.props.dragPosition(markerTime)}
        style={{position: 'absolute', marginLeft: `${position==0? position-3: position-6}%`, cursor: 'pointer', color: '#009CFF'}}
        width="20px"
        height="45px">
        <i style={{fontSize: '1.6vw'}} className="material-icons" > place</i>
        <VerseNumber>{this.props.text}</VerseNumber>
      </label>


    );
  }
}

const VerseNumber = styled.div`
  position: absolute;
  top: .2vw;
  left: .57vw;
  color:white;
  background-color: #009CFF;
  border-radius: .3vw;
  font-size: .7vw;


`;





export default Markers;

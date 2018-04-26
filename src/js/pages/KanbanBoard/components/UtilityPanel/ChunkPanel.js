import React, { Component } from 'react';
import styled from 'styled-components';
import PlayerTracker from '../../../../components/PlayerTracker';


class ChunkPanel extends Component {
  constructor() {
    super();

    this.navigateChunk = this.navigateChunk.bind(this);
  }

  navigateChunk(chunkId, chunkNum) {
    this.props.getTakes(chunkId, chunkNum );
  }

  render() {
    console.log(this.props, 'ALL MY CHUNK PANEL PROPS');
    const {selectedChunk, mode, txt} = this.props; //selectedChunk is the chunk number selected in the navbar, by default is 1
    return (
      <Container>
        {this.props.chunks.map(chk =>{

          return (
            <ChunksContainer selected= {selectedChunk == chk.startv} >
              <label style={{cursor: 'pointer'}} onClick={()=> this.navigateChunk(chk.id, chk.startv)}>{mode} {chk.startv} </label>
              {chk.published_take != null ?
                <PlayerTracker url={chk.published_take.location} />
                :
                <CurrentLabel selected= {selectedChunk == chk.startv}>{selectedChunk == chk.startv ? txt.selected : txt.unavailable} </CurrentLabel>
              }

            </ChunksContainer>);
        })}
      </Container>
    );
  }
}

const Container = styled.div`
  padding-top: .5vw;
`;
const ChunksContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  color: ${props=> props.selected ? 'white': '#969595' } ;
  border-bottom: solid 1px #969595;
  padding-top: 1vw;
  padding-bottom: 1vw;
  font-size: 1vw;
`;

const CurrentLabel= styled.label`
  font-style:${props=> props.selected ? ' ' : 'italic'};
`;



export default ChunkPanel;

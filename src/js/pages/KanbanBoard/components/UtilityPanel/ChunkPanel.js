import React, { Component } from 'react';
import styled from 'styled-components';
import PlayerTracker from '../../../../components/PlayerTracker';
import QueryString from 'query-string';


class ChunkPanel extends Component {
  constructor() {
    super();

    this.navigateChunk = this.navigateChunk.bind(this);
  }

  navigateChunk(chunkId, chunkNum) {
    this.props.getTakes(chunkId, chunkNum);

    const {history, location} = this.props;
    const searchBar = QueryString.parse(location.search);

    history.push({
      pathname: './kanban',
      search: `?chapterId=${searchBar.chapterId}`+
              `&chapterNum=${searchBar.chapterNum}`+
              `&startv=${chunkNum}`+
              `&bookName=${searchBar.bookName}`+
              `&projectId=${searchBar.projectId}`+
              `&mode=${searchBar.mode}`,
    });
  }

  render() {
    const {selectedChunk, mode, txt} = this.props; //selectedChunk is the chunk number selected in the navbar, by default is 1
    return (
      <Container >
        {this.props.chunks.map(chk =>{
          return (
            <ChunksContainer selected={selectedChunk == chk.startv} key={chk.id} >
              <label style={{cursor: 'pointer'}} onClick={()=> this.navigateChunk(chk.id, chk.startv)}>{mode} {chk.startv} </label>
              {chk.published_take != null ?
                <PlayerTracker  url={chk.published_take.location} />
                :
                <CurrentLabel selected={selectedChunk == chk.startv}> 
                  {chk.has_takes == undefined || chk.has_takes ? txt.get("unpublished") : txt.get("noTakes")} 
                </CurrentLabel>
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
Container.displayName = 'Container';
const ChunksContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: ${props=> props.selected ? 'white': '#969595' } ;
  border-bottom: solid 1px #969595;
  padding-top: 1vw;
  padding-bottom: 1vw;
  font-size: 1vw;
`;
ChunksContainer.displayName = 'ChunksContainer';

const CurrentLabel= styled.label`
  font-style:${props=> props.selected ? ' ' : 'italic'};
`;
CurrentLabel.displayName= 'CurrentLabel';


export default ChunkPanel;

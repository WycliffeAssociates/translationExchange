import React from 'react';
import styled from 'styled-components';
import Take from '../Take';
import PlayerTracker from '../../../../components/PlayerTracker';

export default class SelectedTake extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {
    const {take, updateActiveChunkIndex, resetPos,
      activeChunkIndex, active, resetTake} = this.props;
    return (
      <Container>
        <Take take={take}
          updateActiveChunkIndex={updateActiveChunkIndex}
          activeChunkIndex={activeChunkIndex}
          active={active}
          resetPos={resetPos}
          resetTake={resetTake} />

        <Comments active={active}>
          <p> Comments </p>
          <PlayerTracker playHead={'1.6vw'} />
        </Comments>

      </Container>
    );
  }

}

const Container = styled.div`

`;

const Comments = styled.div`
  height: 10vh;
  width: 100%;
  background: ${props => props.active? '#0D4E78' :'#1B2633'};
  border-radius: 5px;
  margin-top: 5px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  text-align: center;
`;

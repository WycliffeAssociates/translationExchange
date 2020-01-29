import React from 'react';
import styled from 'styled-components';

export default class Top extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {
    const {takeNum, chunkNum, txt} = this.props;
    return (
      <Container>
        <Text>
          <TakeNum> {txt.get("take")} {takeNum}</TakeNum>

          <ChunkNum> {txt.get("chunk")} {chunkNum}</ChunkNum>
        </Text>

        <Rating> <i className= "material-icons">done </i> </Rating>
      </Container>
    );
  }

}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
`;

const Text = styled.div`
`;

const TakeNum = styled.h2`
  font-size: 14px;
`;

const ChunkNum = styled(TakeNum)`
  font-size: 18px;
  margin-top: -10px;
`;
const Rating = styled.div`
`;

import React from 'react';
import styled from 'styled-components';

export const ChapterSelected = ({txt, number}) => {
  return (
    <Container>
      <i class="material-icons">chrome_reader_mode</i>
      <p>{`(${number}) ${txt.get("selected")}`}</p>
    </Container>
  );

};

const Container = styled.div`
  height: 95px;
  width: 95px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 20px 20px 20px 20px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  i{
    font-size: 30px;
  }
`;
Container.displayName = 'ChapterSelected';

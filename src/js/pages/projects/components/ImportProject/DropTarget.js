import React from 'react';
import styled from 'styled-components';
import AddFile from './AddFile';

export default class DropTarget extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <Container>
        <DashBorder>
          <h2> Drag your projects here </h2>
          <h3> Or </h3>
          <AddFile {...this.props} />
        </DashBorder>
      </Container>
    );
  }

}

const Container = styled.div`
  background: white;
  height: 50%;
  width: 35%;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 150px;
  min-width: 350px;

`;

const DashBorder = styled.div`
  border: 3px dashed lightgray;
  height: 97%;
  width: 97%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  border-radius: 10px;
  padding: 10%;
  font-weight: 100;

`;

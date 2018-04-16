import React from 'react';
import styled from 'styled-components';

import QueryString from 'query-string';
import update from 'immutability-helper';

import TaskClearButton from './TaskClearButton';

class TaskInfoFailed extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    
    return (
      <Container>
        <TaskClearButton {...this.props} />
      </Container>
    );
  }

}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export default TaskInfoFailed;

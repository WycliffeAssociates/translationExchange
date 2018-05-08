import React from 'react';
import styled from 'styled-components';

import QueryString from 'query-string';
import update from 'immutability-helper';

import TaskTitle from './TaskTitle';
import TaskIdenticon from './TaskIdenticon';

class TaskInfoTop extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    
    return (
      <Container>
        <TaskTitle {...this.props}></TaskTitle>
        <TaskIdenticon task={this.props.task}></TaskIdenticon>
      </Container>
    );
  }

}

const Container = styled.div`
  width: 100%;
  height: 4.4vw;
  display: flex;
  flex-direction: row;
  align-items: stretch;
`;

export default TaskInfoTop;

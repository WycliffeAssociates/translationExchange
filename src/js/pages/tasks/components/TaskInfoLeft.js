import React from 'react';
import styled from 'styled-components';
import TaskInfo from './TaskInfo';
import TaskIdenticon from './TaskIdenticon';

class TaskInfoLeft extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <Container>
        <TaskInfo {...this.props}></TaskInfo>
        <TaskIdenticon task={this.props.task}></TaskIdenticon>
      </Container>
    );
  }

}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
Container.displayName = 'Container';

export default TaskInfoLeft;

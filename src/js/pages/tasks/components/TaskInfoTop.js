import React from 'react';
import styled from 'styled-components';
import TaskTitle from './TaskTitle';
import TaskIdenticon from './TaskIdenticon';

class TaskInfoTop extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const date = new Date(this.props.task.started);

    return (
      <Container>
        <TaskTitle {...this.props}></TaskTitle>
        <DateTime>
          <i className="material-icons" style={{marginRight: '0.4vw', color: '#9c79cf'}}>schedule</i>
          <span style={{fontWeight: 'bold', marginRight: '0.4vw'}}>{date.toLocaleDateString()} </span>
          <span>{date.toLocaleTimeString()}</span>
        </DateTime>
        <TaskIdenticon task={this.props.task}></TaskIdenticon>
      </Container>
    );
  }

}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  flex: 1;
`;
Container.displayName = 'Container';

const DateTime = styled.div`
  flex: 3;
  text-align: left;
  align-items: center;
  display: flex;
  font-size: 1vw;
`;
DateTime.displayName = 'DateTime';

export default TaskInfoTop;

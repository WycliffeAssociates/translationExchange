import React from 'react';
import styled from 'styled-components';
import TaskItemProgress from './TaskItemProgress';
import TaskItemFinished from './TaskItemFinished';

export default class TaskProgress extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    
    return (
      
      <Container>
        {
          this.props.tasks.map((task) => {
            return task.status == "PROGRESS" || task.status == "STARTED"? (
              <TaskItemProgress key={task.id} task={task} {...this.props} />
            ) : (
              <TaskItemFinished key={task.id} task={task} {...this.props} />
            );
          })
        }
      </Container>

    );
  }

}

const Container = styled.div`
  flex: 1
  flex-direction: column;
  max-height: 75vh;
  overflow-y: auto;
  display: flex;
  flex-wrap: nowrap;
  aligh-self: center;
`;
Container.displayName = "Container";

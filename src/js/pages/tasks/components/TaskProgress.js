import React from 'react';
import styled from 'styled-components';
import TaskItem from './TaskItem';

export default class TaskProgress extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    
    return (
      
      <Container>
        
        {
          this.props.tasks.map((task) => {
            return (
              <TaskItem key={task.id} task={task} {...this.props} /> 
            );
          })
        }

      </Container>

    );
  }

}

const Container = styled.div`
  width: 60vw;
  flex: 1
  flex-direction: column;
  max-height: 35vw;
  overflow-y: auto;
  display: flex;
  flex-wrap: nowrap;
  aligh-self: center;
  padding: 0 1vw;
`;

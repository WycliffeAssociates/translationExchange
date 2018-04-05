import React from 'react';
import styled from 'styled-components';

import QueryString from 'query-string';
import update from 'immutability-helper';

import TaskInfoTop from './TaskInfoTop';
import TaskProgressBar from './TaskProgressBar';

import img from '../../../../assets/images/obs-en-01-01-sm.jpg';

class TaskItem extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <TaskDetails>
        <Img>
          <img src={img} />
        </Img>
        
        <RightColumn>
          <TaskInfoTop {...this.props}></TaskInfoTop>
          <TaskProgressBar task={this.props.task}></TaskProgressBar>
        </RightColumn>
      </TaskDetails>
    );
  }

}

const TaskDetails = styled.div`
  background: white;
  margin: 0.9vw 0;
  border-radius: 0.4vw;
  overflow: hidden;
  box-shadow: 0 0 0.6vw 0.1vw #888888;
  display: flex;
  flex-direction: row;
  flex: 0 0 auto;
`;

const Img = styled.div`
  display: flex;
  flex: 1;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0.5vw;
  flex: 6;
`;

export default TaskItem;

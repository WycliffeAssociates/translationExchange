import React from 'react';
import styled from 'styled-components';

import QueryString from 'query-string';
import update from 'immutability-helper';

import TaskInfoTop from './TaskInfoTop';
import TaskProgressBar from './TaskProgressBar';

import img from '../../../../assets/images/sample.jpg';

class TaskItemProgress extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <TaskDetails>
        <Picture>
          <Img src={img}></Img>
        </Picture>
        
        <RightColumn>
          <TaskInfoTop {...this.props}></TaskInfoTop>
          <TaskProgressBar task={this.props.task} />
        </RightColumn>
      </TaskDetails>
    );
  }

}

const TaskDetails = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: row;
  flex: 0 0 auto;
  border-bottom: 2px solid #ccc;
  padding-bottom: 1vw;
  padding-top: 1vw;
  justify-content: center;
`;

const Picture = styled.div`
  display: flex;
  flex: 1;
  position: relative;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  width: 100%; 
  height: 100%; 
  border-radius: 0.3vw;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1vw;
  flex: 6;
  border-radius: 1vw;
  // text-align: center;
  justify-content: space-between;
  // align-items: center;
`;


export default TaskItemProgress;

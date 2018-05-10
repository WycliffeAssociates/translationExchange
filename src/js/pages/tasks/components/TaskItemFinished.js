import React from 'react';
import styled from 'styled-components';

import QueryString from 'query-string';
import update from 'immutability-helper';

import TaskInfoLeft from './TaskInfoLeft';
import TaskProgressBar from './TaskProgressBar';

import img from '../../../../assets/images/sample.jpg';

class TaskItemFinished extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    let flag_bg_color = "#00c43d";
    let flag = "check";
    let bg_color = "#e7fae9";

    if(this.props.task.status == "FAILURE") {
      flag_bg_color = "#e7535f";
      flag = "flag";
      bg_color = "#fcecee";
    }

    return (
      <TaskDetails>
        <Picture>
          <Img src={img}></Img>
          <Flag style={{backgroundColor: flag_bg_color}}>
              <i style={{fontSize: "3.5vw"}} className="material-icons">{flag}</i>
          </Flag>
        </Picture>
        
        <RightColumn style={{backgroundColor: bg_color}}>
          <TaskInfoLeft {...this.props}></TaskInfoLeft>
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
  -webkit-filter:brightness(70%);
  -moz-filter:brightness(70%);
  filter: url(#brightness);
  filter:brightness(70%);
  width: 100%; 
  height: 100%; 
  border-radius: 0.3vw;
`;

const Flag = styled.div`
  color: white;
  font-weight: bold;
  width: 4vw;
  height: 4vw;
  border-radius: 2vw;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 1vw;
  flex: 6;
  border-radius: 1vw;
  text-align: center;
`;

export default TaskItemFinished;

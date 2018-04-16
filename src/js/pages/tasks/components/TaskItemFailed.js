import React from 'react';
import styled from 'styled-components';

import QueryString from 'query-string';
import update from 'immutability-helper';

import TaskInfoFailed from './TaskInfoFailed';
import TaskProgressBar from './TaskProgressBar';

import img from '../../../../assets/images/obs-en-01-01-sm.jpg';

class TaskItemFailed extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      clear: false,
    };

    this.clearTask = this.clearTask.bind(this);
  }

  render() {

    return (
      (() => {
        return !this.state.clear ? 
          <TaskDetails>
            <Img>
              <Failed>
                <i style={{fontSize: "3vw"}} className="material-icons">flag</i>
                <div>Upload failed</div>
              </Failed>
            </Img>
            
            <RightColumn>
              <TaskInfoFailed task={this.props.task} clearTask={this.clearTask} />
            </RightColumn>
        </TaskDetails> :
        null;
      })()
    );
  }

  clearTask() {
    this.setState({clear: true});
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
  height: 6.5vw;
`;

const Img = styled.div`
  display: flex;
  flex: 1;
`;

const Failed = styled.div`
  background-color: #e74c3c;
  text-align: center;
  color: white;
  font-size: 1vw;
  font-weight: bold;
  width: 100%;
  padding-top: 0.5vw;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0.5vw;
  flex: 6;
  padding-right: 0.5vw; 
`;

export default TaskItemFailed;

import React from 'react';
import styled from 'styled-components';

import QueryString from 'query-string';
import update from 'immutability-helper';

import ProgressBar from '../../../components/ProgressBar';

class TaskProgressBar extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const progress = this.props.task.progress || 0;

    let resultStr;
    let resultColor;
    if(this.props.task.status == "SUCCESS")
    {
        resultStr = "Complete";
        resultColor = "white";
    }
    else if(this.props.task.status == "FAILURE")
    {
      resultStr = "Failed";
      resultColor = "red";
    }
    else if(this.props.task.status == "STARTED")
    {
      resultStr = "Started";
      resultColor = "black";
    }

    return (
      <Container style={pbStyle}>
        <ProgressBar 
          now={progress} 
          label={progress < 100 ? progress + "%" : ""}
          result={resultStr}
          resultColor={resultColor}>
        </ProgressBar>
      </Container>
    );
  }

}

const pbStyle = {
  marginTop: "1.4vw",
  paddingRight: "0.5vw",
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: stretch;
`;

export default TaskProgressBar;

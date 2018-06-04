import React from 'react';
import styled from 'styled-components';
import ProgressBar from '../../../components/ProgressBar';

class TaskProgressBar extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const progress = this.props.task.progress || 0;

    let resultStr;
    let resultColor;
    if (this.props.task.status == 'SUCCESS')
    {
      resultStr = 'Complete';
      resultColor = 'white';
    }
    else if (this.props.task.status == 'FAILURE')
    {
      resultStr = 'Failed';
      resultColor = 'red';
    }
    else if (this.props.task.status == 'STARTED')
    {
      resultStr = 'Started';
      resultColor = 'black';
    }

    return (
      <Container>
        <ProgressBar
          now={progress}
          label={progress < 100 ? progress + '%' : ''}
          result={resultStr}
          resultColor={resultColor}>
        </ProgressBar>
      </Container>
    );
  }
}

const Container = styled.div`
  width: 95%;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  flex: 0.3;
`;
Container.displayName = 'Container';

export default TaskProgressBar;

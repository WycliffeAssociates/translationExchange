import React from 'react';
import styled from 'styled-components';
import TaskInfoTop from './TaskInfoTop';
import TaskProgressBar from './TaskProgressBar';
import getIllustrations from '../../../getIllustrations';


class TaskItemProgress extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      illustrations: null,
    };
  }

  componentWillMount() {
    const {task} = this.props;
    let illustrations = getIllustrations(task.details.book_slug);
    this.setState({illustrations: illustrations});
  }
  render() {
    const {illustrations} = this.state;

    return (
      <TaskDetails>
        <Picture>
          <Img src={illustrations.picker}></Img>
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
TaskDetails.displayName = 'TaskDetails';

const Picture = styled.div`
  flex: 1;
  position: relative;
`;
Picture.displayName = 'Picture';

const Img = styled.img`
  width: 100%;
  height: 10vw;
  object-fit: cover;
  border-radius: 0.3vw;
`;
Img.displayName = 'Img';

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
RightColumn.displayName = 'RightColumn';


export default TaskItemProgress;

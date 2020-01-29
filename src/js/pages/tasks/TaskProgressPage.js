import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import QueryString from 'query-string';
import NavBar from '../../components/NavBar';
import {getUserHash, getTasks, removeUser} from '../../actions';
import TaskProgress from './components/TaskProgress';
import GotoProjectsButton from './components/GotoProjectsButton';
import styled from 'styled-components';
import '../../../css/takes.css';

export class TaskProgressPage extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const {search} = this.props.location;
    const query = QueryString.parse(search);
    this.props.getTasks(query.type);
  }

  componentDidMount() {
    const {search} = this.props.location;
    const query = QueryString.parse(search);
    this.interval = setInterval(() => {
      this.props.getTasks(query.type);
    }, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  shouldComponentUpdate(nextProps) {

    if (nextProps.location != this.props.location) {
      return true;
    }

    if (nextProps) {
      return true;
    }
  }

  render() {
    return (
      <TaskProgressPageContainer>
        <NavBar {...this.props} />

        <TaskProgressContainer>

          <TaskProgress {...this.props} />

        </TaskProgressContainer>

        <GotoProjectsButton {...this.props}></GotoProjectsButton>

      </TaskProgressPageContainer>
    );
  }

}

const TaskProgressPageContainer = styled.div`
  position: relative;
  height: 100vh;
  overflow: hidden;
`;
TaskProgressPageContainer.displayName = 'TaskProgressPageContainer';

const TaskProgressContainer = styled.div`
 display: flex;
 width: 60vw;
 flex-direction: row;
 margin: 1.5vw auto;
`;
TaskProgressContainer.displayName = 'TaskProgressContainer';

const mapDispatchToProps = dispatch => {

  return bindActionCreators({getUserHash, getTasks, removeUser}, dispatch);

};

const mapStateToProps = state => {
  const { tasks } = state.taskProgress;
  const { loggedInUser } = state.user;
  const { txt } = state.geolocation;

  return {loggedInUser, txt, tasks};

  // all the state variables that you want to map to props
};


export default connect(mapStateToProps,mapDispatchToProps)(TaskProgressPage);

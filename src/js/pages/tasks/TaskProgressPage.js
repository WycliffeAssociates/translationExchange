import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import QueryString from 'query-string';
import NavBar from '../../components/NavBar';
import {getUserHash, getTasks, updateLanguage, removeUser} from '../../actions';
import TaskProgress from './components/TaskProgress';
import GotoProjectsButton from './components/GotoProjectsButton';
import styled from 'styled-components';
import 'css/takes.css';

class TaskProgressPage extends React.Component {

  constructor(props) {
    super(props);

    let interval;
  }

  componentWillMount() {
    const {search} = this.props.location;
    const query = QueryString.parse(search);
    this.props.getTasks(query.type);
    const language = localStorage.getItem('language');
    if (language) {
      updateLanguage(language);
    }
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
    const {search} = this.props.location;
    const query = QueryString.parse(search);

    let taskProgressComponent = "No such tasks";

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

`;
TaskProgressPageContainer.displayName = "TaskProgressPageContainer";

const TaskProgressContainer = styled.div`
 display: flex;
 width: 60vw;
 flex-direction: row;
 margin: 1.5vw auto;
`;
TaskProgressContainer.displayName = "TaskProgressContainer";

const mapDispatchToProps = dispatch => {

  return bindActionCreators({getUserHash, getTasks, updateLanguage, removeUser}, dispatch);

};

const mapStateToProps = state => {
  const { tasks } = state.taskProgress;
  const { loggedInUser } = state.user;
  const { txt } = state.geolocation;

  return {loggedInUser, txt, tasks};

  // all the state variables that you want to map to props
};


export default connect(mapStateToProps,mapDispatchToProps)(TaskProgressPage);

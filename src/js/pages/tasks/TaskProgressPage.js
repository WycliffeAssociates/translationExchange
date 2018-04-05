import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import QueryString from 'query-string';
import NavBar from '../../components/NavBar';
import {getUserHash, getTasks} from '../../actions';
import UtilityPanel from '../../components/UtilityPanel';
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

const TaskProgressContainer = styled.div`
 display: flex;
 width: 60vw;
 flex-direction: row;
 margin: 1.5vw auto;
`;

const mapDispatchToProps = dispatch => {

  return bindActionCreators({getUserHash, getTasks}, dispatch);

};

const mapStateToProps = state => {
  const { tasks } = state.taskProgress;
  const { loggedInUser } = state.user;
  const { displayText } = state.geolocation;

  return {loggedInUser, displayText, tasks};

  // all the state variables that you want to map to props
};


export default connect(mapStateToProps,mapDispatchToProps)(TaskProgressPage);

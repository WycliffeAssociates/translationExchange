import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import ProjectsPage from './js/pages/projects/ProjectPage';
import './App.css';
import './css/chapters.css'
import NotFound from './js/pages/NotFound';
import axios from 'axios';
import User from './js/pages/user/user';
import Welcome from './js/pages/Login/LoginPage.js';
import AvailableUsers from './js/pages/Login/AvailableUsers.js';
import ErrorPage from './js/pages/ErrorPage/ErrorPage';
import CreateUserContainer from './js/pages/user/components/CreateUserContainer';
import { DragDropContext } from 'react-dnd';
import KanbanPage from './js/pages/KanbanBoard/KanbanPage';
import TaskProgressPage from './js/pages/tasks/TaskProgressPage';
import CustomDragLayer from './CustomDragLayer';
import ChapterPage from './js/pages/chapters/ChaptersPage';
import { default as TouchBackend } from 'react-dnd-touch-backend';
import 'react-toastify/dist/ReactToastify.css';

// import and configure the raven client for sentry in order to track errors
import Raven from 'raven-js';
Raven.config('http://87c87feff8a940c2801867000766c13d@localhost:9000/3').install();


class App extends Component {
  constructor(props) {
    super(props);

    //configuration for web requests
    axios.defaults.timeout = 20000;

    this.state ={
      hasError: false,
    };
  }

  componentDidCatch(error, info) {
    this.setState({hasError: true});
    Raven.captureException(error, {extra: info}); //send error to raven client
  }



  render() {
    return (
    /*
                This is a list of different possible routes and what components should
                be rendered for each one
    */

      <div>
        <CustomDragLayer />

        <Switch>
          <Route  exact path="/" component={Welcome} />
          <Route  exact path ="/users" component={AvailableUsers} />
          <Route  exact path="/users/registration" component={CreateUserContainer} />
          <Route  path="/welcome" component={Welcome} />
          <Route  path="/projects" component={ProjectsPage} />
          <Route  path="/chapters" component={ChapterPage} />
          <Route path ="/progress" component={TaskProgressPage} />
          <Route path ="/kanban" component={KanbanPage} />
          <Route path ="/errorPage" component={ErrorPage} />
          <Route path="*" component={NotFound} />
        </Switch>


      </div>
    );
  }
}

export default DragDropContext(TouchBackend({ enableMouseEvents: true }))(App);

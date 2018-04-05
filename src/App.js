import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import ChunkListContainer from './js/pages/chunks/ChunkListContainer';
import ProjectsListContainer from './js/pages/projects/ProjectsListContainer';
import ProjectContainer from './js/pages/projects/ProjectPage';
import ChaptersContainer from './js/pages/chapters/ChaptersContainer';
import './App.css';
import NotFound from './js/pages/NotFound';
import Home from './js/pages/home/home';
import About from './js/pages/about/about';
import axios from 'axios';
import User from './js/pages/user/user';
import Welcome from './js/pages/Login/LoginPage.js';
import AvailableUsers from './js/pages/Login/AvailableUsers.js';
import CreateUserContainer from './js/pages/user/components/CreateUserContainer';
import { DragDropContext } from 'react-dnd';
import Notifications from 'react-notify-toast';
import Root from './js/components/Root.js';
import KanbanPage from './js/pages/KanbanBoard/KanbanPage';
import CustomDragLayer from './CustomDragLayer';
import { default as TouchBackend } from 'react-dnd-touch-backend';

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
        <Notifications />
        <CustomDragLayer />

        <Switch>
          <Route  exact path="/" component={Root} />
          <Route  exact path ="/users" component={AvailableUsers} />
          <Route  exact path="/users/registration" component={CreateUserContainer} />
          <Route  path="/home" component={Home} />
          <Route  path="/welcome" component={Welcome} />
          <Route  path="/about" component={About} />
          <Route path="/ProjectContainer" component={ProjectContainer} />
          <Route  path="/projects" component={ProjectsListContainer} />
          <Route  path="/chapters" component={ChaptersContainer} />
          <Route  path="/takes" component={ChunkListContainer} />
          <Route  path="/user" component={User} />
          <Route path ="/newComponents" component={KanbanPage} />
          <Route path ="/kanbanPage" component={KanbanPage} />
          <Route path="*" component={NotFound} />
        </Switch>


      </div>
    );
  }
}

export default DragDropContext(TouchBackend({ enableMouseEvents: true }))(App);

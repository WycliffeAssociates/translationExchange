import React, { Component } from 'react';
import {Button, Divider, Segment} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

class NotFound extends Component {

  render() {
    return (
      <Segment raised textAlign="center">
                 This page does not exist.
        <Divider />
        <Link to="/projects">
          <Button color= "green" content= "Projects" />
        </Link>
      </Segment>
    );
  }
}

export default NotFound;

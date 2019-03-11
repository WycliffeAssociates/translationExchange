import React, { Component } from 'react';
import {Button, Divider, Segment} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

class NotFound extends Component {

  componentWillMount() {
    if(!this.props.match.isExact && this.props.match.path == "/") {
      this.props.history.push ({
        pathname: '/welcome',
      });
    }
  }

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

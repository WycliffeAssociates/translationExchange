import React, { Component } from 'react';
import {Button, Divider, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";

class NotFound extends Component {

    render() {
        // link of page
        // {window.document.location.href}
        return (
            <Segment raised textAlign="center">
                 This page doesn't exist.
                <Divider/>
                <Link to="/projects">
                   <Button color='green' content='Projects'/>
                </Link>
            </Segment>
        );
    }
}

export default NotFound;
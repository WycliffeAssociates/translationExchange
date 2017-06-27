import React, { Component } from 'react';
import ChapterList from "../chapter/ChapterList";

class ProjectContainer extends Component {
    constructor (props) {
        super(props);
        this.state = {
            chapters: []
        };
    }

    componentDidMount () {
        //request project and chapter info here...
        this.setState(
            {
                chapters: [
                    {number: 1},
                    {number: 2},
                    {number: 16}
                ]
            }
        );
    }

    render () {
        return (
            <ChapterList
                chapters={this.state.chapters}
                path={this.props.location.pathname}
            />
        );
    }
}

export default ProjectContainer;

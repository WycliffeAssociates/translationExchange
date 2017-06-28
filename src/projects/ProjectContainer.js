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
                    {
                        number: 1,
                        percentFinished: 100.0,
                        checkingLevel: 2,
                        contributors: ["Alison"],
                        timestamp: "20 June 2017 4:16 pm"
                    },
                    {
                        number: 16,
                        percentFinished: 16.0,
                        checkingLevel: 0,
                        contributors: ["Bob the Translator"],
                        timestamp: "20 June 2017 6:07 am"
                    }
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

import React, {Component} from 'react';
import {Button} from 'semantic-ui-react'
import 'css/chapters.css'

class DownloadProjects extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false
        };
        this.downloadProject = this.downloadProject.bind(this)
    }

    downloadProject() {
        this.setState({loading: true});
        this.props.onDownloadProject();
    }

    render () {

        return (
            <Button
                content='Download'
                icon='download'
                labelPosition='right'
                size='small'
                onClick={this.downloadProject}
            />
        );
    }
}

export default DownloadProjects;
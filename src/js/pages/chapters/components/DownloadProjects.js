import React, {Component} from 'react';
import {Button} from 'semantic-ui-react'
import 'css/chapters.css'

class DownloadProjects extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false
        };
    }

    downloadProject() {
        this.props.onDownloadProject();
        this.setState({loading: true});
    }

    render () {

        return (
            <Button
                content='Download'
                icon='download'
                labelPosition='right'
                size='small'
                onClick={this.downloadProject.bind(this)}
            />
        );
    }
}

export default DownloadProjects;
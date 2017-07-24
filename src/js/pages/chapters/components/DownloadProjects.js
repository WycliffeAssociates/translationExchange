import React, {Component} from 'react';
import {Button, Icon} from 'semantic-ui-react'
import 'css/chapters.css'

class DownloadProjects extends Component {

    render () {

        return (
            <Button
                content='Download'
                icon='download'
                labelPosition='right'
                size='small'
                onClick={this.props.onDownloadProject}
            />

        );
    }
}

export default DownloadProjects;
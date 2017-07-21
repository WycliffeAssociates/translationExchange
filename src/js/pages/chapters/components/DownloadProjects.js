import React, {Component} from 'react';
import {Button, Icon} from 'semantic-ui-react'
import 'css/chapters.css'

class DownloadProjects extends Component {

    render () {

        return (
            <div id="download_chapter_audio">
                <Button
                    content='Download'
                    icon='download'
                    labelPosition='right'
                    onClick={this.props.onDownloadProject}
                />
            </div>

        );
    }
}

export default DownloadProjects;
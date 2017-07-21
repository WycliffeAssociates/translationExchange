import React, {Component} from 'react';
import { Button} from 'semantic-ui-react'
import 'css/chapters.css'

class DownloadProjects extends Component {

    render () {

        return (
            <div id="download_chapter_audio">
                <h4>Download Project</h4>
                <Button contents="Click Here" onClick={() => alert('insert function to download the files here')}>
                    {/*<Icon name='trash' size="large"/>*/}
                    {/*Click Here*/}
                </Button>
            </div>

        );
    }
}

export default DownloadProjects;
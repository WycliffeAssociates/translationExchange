import React, {Component} from 'react';
import {Button} from 'semantic-ui-react'
import 'css/chapters.css'

class DownloadProjects extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false
        };
        this.saveFile = this.saveFile.bind(this)
    }

    saveFile() {
        this.setState({loading: true});
        this.props.saveFile();
    }

    render () {

        return (
            <Button
                content='Download'
                icon='download'
                labelPosition='right'
                size='small'
                onClick={this.saveFile}
            />
        );
    }
}

export default DownloadProjects;
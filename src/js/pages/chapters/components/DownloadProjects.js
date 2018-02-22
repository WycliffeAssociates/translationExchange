import React, { Component } from 'react';
import { Button, Dropdown } from 'semantic-ui-react'
import { connect } from "react-redux";
import 'css/chapters.css'
const options = [
    { key: 'mp3', icon: 'file archive outline', text: 'MP3', value: 'mp3' },
    { key: 'wav', icon: 'file archive outline', text: 'WAV', value: 'wav' }
]
class DownloadProjects extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            file_format: 'mp3'
        };
        this.onDownloadProject = this.onDownloadProject.bind(this)
    }

    onDownloadProject() {
        this.setState({ loading: true });
        const message = {action: "download_project"};
        // sends message to channels back-end
        const {socket} = this.props;
        socket.send(JSON.stringify(message))
        //this.props.onDownloadProject(this.state.file_format);
    }
    getFileFormat(event, data) {
        this.setState({
            file_format: data.value
        });
    }

    render() {
        return (
            <Button.Group color='teal'>
                <Button onClick={this.onDownloadProject}>Download</Button>
                <Dropdown options={options} floating button className='icon' onChange={this.getFileFormat.bind(this)} />
            </Button.Group>

        );
    }
}

const mapStateToProps = state => {

    const {socket} = state.webSocket;

    return{socket};
}

export default connect(mapStateToProps)(DownloadProjects);

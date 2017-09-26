import React, {Component} from 'react';
import { connect } from "react-redux";
import {Button} from 'semantic-ui-react'
import 'css/chapters.css'

class DownloadProjects extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false
        };
        this.onDownloadProject = this.onDownloadProject.bind(this)
    }

    onDownloadProject() {
        this.setState({loading: true});
        this.props.onDownloadProject();
    }

    render () {

        return (
            <Button
                content={this.props.language.download}
                icon='download'
                labelPosition='right'
                size='small'
                onClick={this.onDownloadProject}
            />
        );
    }
}


const mapStateToProps = state => {

const{ language } = state.geolocation;

return{language};

};


export default connect (mapStateToProps) (DownloadProjects);

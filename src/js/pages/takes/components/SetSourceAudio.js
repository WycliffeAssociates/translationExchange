import React, { Component } from 'react'
import { Dropdown } from 'semantic-ui-react'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { fetchAllSourceAudio } from "../../../actions";

class SetSourceAudio extends Component {
    componentDidMount() {
        this.props.fetchAllSourceAudio(this.props.projectId, this.props.language.slug, this.setSource.bind(this));
    }
    setSource(project) {
        this.props.setSourceProject(project);
    }

    render() {
        return (
            <Dropdown
                search
                selection
                floated="right"
                labeled
                className="icon"
                icon="assistive listening systems"
                value={this.props.selectedSourceProject}
                loading={!this.props.loaded}
                options={this.props.projects}
                onChange={(event, dropdown) => { this.setSource(dropdown.value) }}
            />
        );
    }
}
const mapStateToProps = state => {
    const { loaded, error, projects } = state.sourceAudio;
    return {
        loaded, error, projects
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        fetchAllSourceAudio
    }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(SetSourceAudio);
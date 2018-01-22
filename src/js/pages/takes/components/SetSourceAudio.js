import React, { Component } from 'react'
import { Dropdown } from 'semantic-ui-react'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { fetchAllSourceAudio } from "../../../actions";

class SetSourceAudio extends Component {
    constructor(props){
      super(props);
      this.state ={menu:'select language'}

    }

    componentDidMount() {
        this.props.fetchAllSourceAudio(this.setSource.bind(this));
    }
    setSource(project) {
      this.setState({menu: project})

      debugger;
        //this.props.setSourceProject(project);

    }

    render() {
      this.pro
        return (
            this.props.projects.length > 0 ?
                <Dropdown
                    search
                    selection
                    floated="right"
                    labeled
                    className="icon"
                    icon="assistive listening systems"
                    value={this.state.menu}
                    loading={!this.props.loaded}
                    options={this.props.projects}
                    onChange={(event, dropdown) => { this.setSource(dropdown.value) }}
                /> : null
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

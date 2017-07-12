import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Redirect from "react-router-dom/es/Redirect";
import {Table} from 'semantic-ui-react'
class ChapterList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirectToChapter: null
        };
    }

    render () {
        return (

        <Table.Body>
        {this.state.redirectToChapter
            ? <Redirect push to={{pathname: this.props.path + '/ch' + this.state.redirectToChapter}}/>
            : this.props.chapters.map(this.createListItem.bind(this))
        }
        </Table.Body>

        );
    }

    createListItem (chapter) {
        return (

            <Table.Row onClick={() => this.setState({redirectToChapter: chapter.number})}>

            <Table.Cell>{chapter.number}</Table.Cell>
            <Table.Cell>{chapter.percentFinished}</Table.Cell>
            <Table.Cell>{chapter.checkingLevel}</Table.Cell>
                <Table.Cell>{chapter.contributors}</Table.Cell>
                <Table.Cell>{chapter.translationType}</Table.Cell>
                <Table.Cell>{chapter.timestamp}</Table.Cell>
            </Table.Row>

        );
    }
}

ChapterList.propTypes = {
    chapters: PropTypes.arrayOf(PropTypes.shape({
        number: PropTypes.number.isRequired,
        percentFinished: PropTypes.number.isRequired,
        checkingLevel: PropTypes.number.isRequired,
        contributors: PropTypes.arrayOf(PropTypes.string).isRequired,
        timestamp: PropTypes.string.isRequired
    })).isRequired,
    path: PropTypes.string.isRequired
};

export default ChapterList;
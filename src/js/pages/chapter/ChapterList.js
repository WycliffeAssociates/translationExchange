import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

class ChapterList extends Component {
    render () {
        return (
            <ul>
                {this.props.chapters.map(this.createListItem.bind(this))}
            </ul>
        );
    }

    createListItem (chapter) {
        return (
            <li key={chapter.number}>
                <Link to={this.props.path + '/ch' + chapter.number}>Chapter {chapter.number}</Link>
            </li>
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
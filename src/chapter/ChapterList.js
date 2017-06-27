import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class ChapterList extends Component {
    render () {
        console.dir(this.props);
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

export default ChapterList;
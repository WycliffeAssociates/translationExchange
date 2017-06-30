import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import Redirect from "react-router-dom/es/Redirect";

class ChapterList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirectToChapter: null
        };
    }


    render () {
        return (

        <tbody>
        {this.state.redirectToChapter
            ? <Redirect push to={{pathname: '/ch' + this.state.redirectToChapter}}/>
            : this.props.chapters.map(this.createListItem.bind(this))
        }
        </tbody>

            // <ul>
            //     {this.props.chapters.map(this.createListItem.bind(this))}
            // </ul>
        );
    }

    createListItem (chapter) {
        return (
        <tr onClick={() => this.setState({redirectToChapter: chapter.number})}>


            <th scope="row"> {chapter.number}</th>
            <td>{chapter.percentFinished} </td>
            <td>{chapter.checkingLevel}</td>

        </tr>
            //
            // <li key={chapter.number}>
            //     <Link to={this.props.path + '/ch' + chapter.number}>Chapter {chapter.number}</Link>
            // </li>
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
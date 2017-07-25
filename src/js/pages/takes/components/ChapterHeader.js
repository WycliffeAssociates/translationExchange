import React, {Component} from 'react';
import PropTypes from "prop-types";
import MarkAsDone from "./MarkAsDone";
import CommentContainer from "./comments/CommentContainer"

class ChapterHeader extends Component {
    render () {
        return (
            <h1 marginWidth={25}>
                Chapter {this.props.chapter}
                {this.props.loaded
                    ? " (" + this.props.book + ", " + this.props.language + ")"
                    : ""
                }
                <CommentContainer
                    ref={instance => (this.commentContainer = instance)}/>
                <MarkAsDone chapter={this.props.chapter}
                            book={this.props.book}
                            language={this.props.language}
                            chunks={this.props.chunks}
                />
            </h1>
        );
    }
}

ChapterHeader.propTypes = {
    loaded: PropTypes.bool.isRequired,
    chapter: PropTypes.number.isRequired,
    book: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
    chunks: PropTypes.array.isRequired
};

export default ChapterHeader;
import React, {Component} from 'react';
import PropTypes from "prop-types";
import MarkAsDone from "./MarkAsDone";

class ChapterHeader extends Component {
    render () {
        return (
            <h1 marginWidth={25}>
                Chapter {this.props.chapter}
                {this.props.loaded
                    ? " (" + this.props.book + ", " + this.props.language + ")"
                    : ""
                }
                {/* CommentContainer can go here */}
                <MarkAsDone chapter={this.props.chapter}
                            book={this.props.book}
                            language={this.props.language}
                            takes={this.props.takes}
                            numChunks={this.props.chunks.length}
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
    takes: PropTypes.array.isRequired,
    chunks: PropTypes.array.isRequired
};

export default ChapterHeader;
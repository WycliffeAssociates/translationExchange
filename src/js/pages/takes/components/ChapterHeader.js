import React, {Component} from 'react';
import PropTypes from "prop-types";
import MarkAsDone from "./MarkAsDone";
import CommentContainer from "./comments/PinkButton"
import SetSourceAudio from "./SetSourceAudio"

class ChapterHeader extends Component {
    render() {

        return (
            <h1 marginWidth={25}>
                    Chapter {this.props.chapter.number}
                    {this.props.loaded
                        ? " (" + this.props.book + ", " + this.props.language + ")"
                        : ""
                    }

                <CommentContainer
                    ref={instance => (this.commentContainer = instance)}
                    comments={this.props.chapter.comments}
                    id={this.props.chapter.id}
                    onClickSave={this.props.onClickSave}
                    type={"chapter"}
                    deleteComment={this.props.deleteComment}
                />
                <MarkAsDone chapter={this.props.chapter}

                            language={this.props.language}
                            chunks={this.props.chunks}
                            mode={this.props.mode}
                />
                <SetSourceAudio/>
            </h1>
        );
    }
}

ChapterHeader.propTypes = {
    loaded: PropTypes.bool.isRequired,
    language: PropTypes.string.isRequired,
    chunks: PropTypes.array.isRequired
};

export default ChapterHeader;
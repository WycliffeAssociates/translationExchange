import React, {Component} from 'react';

class ChapterContainer extends Component {
    render () {
        return (
            <div>I'm a chapter container for {this.props.match.params.chid}!</div>
        );
    }
}

export default ChapterContainer;
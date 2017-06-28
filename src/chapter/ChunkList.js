import React, { Component } from 'react';
import TakeList from "../takes/TakeList";

class ChunkList extends Component {
    render () {
        return (
            <ul>
                {this.props.segments.map(this.createListItem.bind(this))}
            </ul>
        );
    }

    createListItem (segment) {
        var modeLabel = "";
        switch (this.props.mode) {
            case "verse":
                modeLabel = "Verse";
                break;
            case "chunk":
                modeLabel = "Chunk";
                break;
        }
        return (
            <li key={segment.id}>
                Displaying takes for {modeLabel} {segment.number}...
                <TakeList
                    takes={segment.takes}
                />
            </li>
        );
    }
}

export default ChunkList;
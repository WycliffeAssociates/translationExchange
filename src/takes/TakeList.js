import React, { Component } from 'react';
import Take from "./Take";

class TakeList extends Component {
    render () {
        return (
            <div>
                {this.props.takes.map(this.createListItem)}
            </div>
        );
    }

    createListItem (take) {
        return (
            <Take
                take={take}
            />
        );
    }
}

export default TakeList;
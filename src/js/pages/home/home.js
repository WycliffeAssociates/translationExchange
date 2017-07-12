import React, { Component } from 'react';
import AudioComponent from '../takes/components/AudioComponent';
import { Button, Header, Image, Modal } from 'semantic-ui-react'


class Home extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <div>



                            <h1>Welcome to Translation Manager</h1>






               <AudioComponent/>








            </div>
        );
    }
}

export default Home;
import React, { Component } from 'react';
import {Menu, state, handleItemClick} from "semantic-ui-react";
import * as ReactDOM from "react-dom";
import {LinkContainer} from "react-router-bootstrap";

class Header extends Component {
    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name });
        ReactDOM.findDOMNode(this.audioComponent).dispatchEvent(new Event('audio-play'));
    }

    //
    // constructor(props) {
    //     super(props);
    //
    //     this.toggle = this.toggle.bind(this);
    //     this.state = {
    //         isOpen: false
    //     };
    // }
    // toggle() {
    //     this.setState({
    //         isOpen: !this.state.isOpen
    //     });
    // }
    render() {
        // return (
        //     <div>
        //         <Navbar inverse collapseOnSelect>
        //             <Navbar.Header>
        //                 <Navbar.Brand>
        //                     <LinkContainer to="/">
        //                         <a>Translation Manager</a>
        //                     </LinkContainer>
        //                 </Navbar.Brand>
        //                 <Navbar.Toggle />
        //             </Navbar.Header>
        //             <Navbar.Collapse>
        //
        //                 <Nav pullRight>
        //                     <LinkContainer to="/about/">
        //                         <NavItem eventKey={1}>About</NavItem>
        //                     </LinkContainer>
        //
        //                     <LinkContainer to="/projects/">
        //                         <NavItem eventKey={2}>Projects</NavItem>
        //                     </LinkContainer>
        //
        //                 </Nav>
        //
        //
        //             </Navbar.Collapse>
        //         </Navbar>
        //
        //
        //
        //
        //     </div>
        // );


        return (
            <Menu inverted size='large'>

                <LinkContainer to="/">
                    <Menu.Item header name='Home'>Translation Manager</Menu.Item>
                </LinkContainer>

                <LinkContainer to="/">
                    <Menu.Item name='Home' />
                </LinkContainer>

                <LinkContainer to="/about">
                    <Menu.Item name='About' />
                </LinkContainer>

                <LinkContainer to="/projects">
                    <Menu.Item  name='Projects' />
                </LinkContainer>


            </Menu>
        )
    }
}

export default Header;
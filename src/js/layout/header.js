import React, { Component } from 'react';
import {Nav, Navbar, NavDropdown, NavItem} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";


class Header extends Component {
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
                <Navbar inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <LinkContainer to="/">
                                <a>Translation Manager</a>
                            </LinkContainer>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>

                        <Nav pullRight>
                            <LinkContainer to="/about/">
                                <NavItem eventKey={1}>About</NavItem>
                            </LinkContainer>

                            <LinkContainer to="/projects/">
                                <NavItem eventKey={2}>Projects</NavItem>
                            </LinkContainer>

                        </Nav>


                    </Navbar.Collapse>
                </Navbar>




            </div>
        );
    }
}

export default Header;
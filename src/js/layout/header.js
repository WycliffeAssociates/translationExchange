import React, { Component } from 'react';
import {
    Collapse, Navbar, NavbarBrand, Nav, NavItem, NavLink, Container, Row, Col,
    Jumbotron, InputGroup, Input, InputGroupAddon,} from 'reactstrap';
import 'bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

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

                <Navbar style={{borderRadius: '0px'}} color="default" inverse fixed>
                    <LinkContainer to="/home/">
                        <NavbarBrand>Translation Manager</NavbarBrand>
                    </LinkContainer>
                    <Collapse isOpen={this.state.isOpen} navbar>

                        <Nav className="ml-auto" navbar >

                            <NavItem  style={{marginLeft: '900px', marginTop: '15px', fontsize:'30px'}}>
                                <LinkContainer to="/projects/">
                                    <NavLink>Projects</NavLink>
                                </LinkContainer>
                                <LinkContainer to="/about/">
                                    <NavLink> About</NavLink>
                                </LinkContainer>
                            </NavItem>

                        </Nav>

                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default Header;
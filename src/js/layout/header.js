import React , {Component} from 'react';
import {Nav, Navbar} from 'react-bootstrap';
import { NavItem, NavLink} from "reactstrap";

import { LinkContainer } from 'react-router-bootstrap';

class Header extends Component {


    constructor(props){
        super(props);

    }
    render (){

        return (
            <Navbar inverse collapseOnSelect  fixedTop = {true} >

                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">Translation Manager</a>
                    </Navbar.Brand>
                </Navbar.Header>

                    <Nav pullRight >

                        <NavItem >

                            <LinkContainer to="/projects/">
                                <NavLink>Projects</NavLink>
                            </LinkContainer>
                        </NavItem>

                        <NavItem>
                            <LinkContainer to="/about/">
                                <NavLink>About</NavLink>
                            </LinkContainer>
                        </NavItem>

                        <NavItem>
                            <LinkContainer to="/testing/">
                                <NavLink>Test Audio</NavLink>
                            </LinkContainer>
                        </NavItem>


                    </Nav>

            </Navbar>
        );

    }
}

export default Header;



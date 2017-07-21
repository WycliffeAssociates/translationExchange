import React, { Component } from 'react';
import {Menu, state, handleItemClick} from "semantic-ui-react";
import {Link} from "react-router-dom";
import * as ReactDOM from "react-dom";


class Header extends Component {
    state = { activeItem: 'home' };

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name });

    }


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

        const { activeItem } = this.state;

        return (
            <Menu inverted size='large'>
                <Link to="/">
                    <Menu.Item name='Home' active={activeItem === 'Home'} onClick={this.handleItemClick} />
                </Link>

                <Link to="/about">
                    <Menu.Item  name='About' active={activeItem === 'About'} onClick={this.handleItemClick} />
                </Link>

                <Link to="/projects">
                    <Menu.Item  name='Projects' active={activeItem === 'Projects'} onClick={this.handleItemClick} />
                </Link>
            </Menu>
        )
    }
}

export default Header;
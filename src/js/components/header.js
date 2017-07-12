import React, { Component } from 'react';
import {Menu} from "semantic-ui-react";
import {Link} from "react-router-dom";


class Header extends Component {
    state = { activeItem: 'home' };

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

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

        const { activeItem } = this.state;

        return (
            <Menu inverted size='large'>
                <Menu.Item as={Link} to='/' name='Home' active={activeItem === 'home'} onClick={this.handleItemClick} />
                <Menu.Item as={Link} to='/about/' name='About' active={activeItem === 'messages'} onClick={this.handleItemClick} />
                <Menu.Item as={Link} to='/projects/' name='Projects' active={activeItem === 'friends'} onClick={this.handleItemClick} />
            </Menu>
        )
    }
}

export default Header;
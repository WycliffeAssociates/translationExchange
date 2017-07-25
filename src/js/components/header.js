import React, { Component } from 'react';
import {Menu, state, handleItemClick, Container, Image} from "semantic-ui-react";
import {Link} from "react-router-dom";
import 'css/home.css'
import combinedShape from 'images/combined-shape.png'


class Header extends Component {
    state = { activeItem: 'home' };


    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name });

    }


    render() {

        var logo = <Image src={combinedShape} size="tiny"/>
        var text = <h1><font color="#F5A623">Our Translation Project</font></h1>

        const { activeItem } = this.state;

        return (
            <Container fluid className="gray">

                <Menu  fluid secondary size='huge' compact inverted >
                    <Menu.Item content={logo} />
                    <Menu.Item content={text} />

                    <Menu.Item position="right">
                        <Link position="right" to="/">
                            <Menu.Item position="right" name='Home' active={activeItem === 'Home'} onClick={this.handleItemClick} />
                        </Link>

                        <Link to="/about">
                            <Menu.Item  name='About' active={activeItem === 'About'} onClick={this.handleItemClick} />
                        </Link>

                        <Link to="/projects">
                            <Menu.Item  name='Projects' active={activeItem === 'Projects'} onClick={this.handleItemClick} />
                        </Link>
                    </Menu.Item>

                </Menu>

                <Container className="yellowBar" fluid></Container>

            </Container>

        )
    }
}

export default Header;
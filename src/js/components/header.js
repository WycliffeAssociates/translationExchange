import React, { Component } from 'react';
import {Menu, state, handleItemClick, Container, Image} from "semantic-ui-react";
import {Link} from "react-router-dom";
import * as ReactDOM from "react-dom";
import 'css/home.css'


class Header extends Component {
    state = { activeItem: 'home' };


    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name });

    }


    render() {

        var logo = <Image src="https://files.slack.com/files-pri/T5RBHJC4T-F6CTSP6MT/combined_shape.png" size="tiny"/>

        var text = <Image src="" />

        const { activeItem } = this.state;

        return (
            <Container fluid className="gray">

                <Menu  fluid secondary size='huge' compact inverted >
                    <Menu.Item content={logo} />

                    {/*<Menu.Item content={text} />*/}

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
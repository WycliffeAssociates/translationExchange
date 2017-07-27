import React, { Component } from 'react';
import {Menu, state, handleItemClick, Container, Image, Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";
import 'css/home.css'
import combinedShape from 'images/combined-shape.png'
import user from 'images/user.png'
import dots from 'images/dots.png'


class Header extends Component {
    state = { activeItem: 'home' };


    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name });

    }

    render() {


        var logo = <Image src={combinedShape} size="tiny"/>
        var text = <h1><font color="#A8A8A8">Terra</font></h1>

        const { activeItem } = this.state;

        return (

            <div>

                <Menu fluid secondary size='huge' compact >

                    <Menu.Item position="left">
                        <Link to="/">
                        <Menu.Item>
                            <Image src={dots} width="120" height="30"/>
                        </Menu.Item>
                        </Link>
                        <Link to="/">
                        <Menu.Item content={text} />
                        </Link>
                    </Menu.Item>


                    <Menu.Item position="right">
                        <Link to="/">
                            <Menu.Item position="right" name='Home' active={activeItem === 'Home'} onClick={this.handleItemClick} />
                        </Link>

                        <Link to="/about">
                            <Menu.Item  name='About' active={activeItem === 'About'} onClick={this.handleItemClick} />
                        </Link>

                        <Link to="/projects">
                            <Menu.Item  name='Projects' active={activeItem === 'Projects'} onClick={this.handleItemClick} />
                        </Link>

                        <Link to="/user">
                            <Menu.Item>
                                <Image src={user} size="mini"/>
                            </Menu.Item>
                        </Link>
                    </Menu.Item>

                </Menu>

                <Container className="redBar" fluid></Container>
            </div>


        )
    }
}

export default Header;
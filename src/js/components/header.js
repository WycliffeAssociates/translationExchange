import React, { Component } from 'react';
import {Menu, state, handleItemClick, Container, Image, Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";
import * as ReactDOM from "react-dom";
import 'css/home.css'
import combinedShape from 'images/combined-shape.png'


class Header extends Component {
    state = { activeItem: 'home' };


    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name });

    }


    buildLogo() {

        return(
            <div>
                <Icon name="circle" color="red" />
                <Icon name="circle" color="green" />
                <Icon name="circle" color="yellow" />
                <Icon name="circle" color="purple" />
            </div>
        );
    }

    render() {


        var logo = <Image src={combinedShape} size="tiny"/>
        var text = <h1><font color="#F5A623">Our Translation Project</font></h1>

        const { activeItem } = this.state;

        return (

            <div>

                <Menu  fluid secondary size='huge' compact >
                    <Menu.Item content={this.buildLogo()} />
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

                <Container className="redBar" fluid></Container>
            </div>


        )
    }
}

export default Header;
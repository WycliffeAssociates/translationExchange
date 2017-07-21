import React, { Component } from 'react';
import { Button, Header, Image, Modal, Container, Segment, Grid, Form, Table, Divider } from 'semantic-ui-react'
import 'css/home.css'


class Home extends Component {
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

    onClick() {
        alert('clicked')
    }

    render() {
        return (

            <div>
                {<Container className="yellowBar" fluid>.</Container>}

                <Container className="top" fluid >

                    <Grid columns={2} className="grid">
                        <Grid.Column width={5} verticalAlign="middle">
                            <Image src="/Users/Downloads/nathan.jpeg" alt="image goes here" />

                        </Grid.Column>

                        <Grid.Column verticalAlign="middle">
                            <Segment className="login">
                                <Form>
                                    <Form.Field>
                                        <label>What is your name?</label>
                                        <input placeholder="username" />
                                    </Form.Field>
                                    <Button floated="right" content="submit" />
                                </Form>
                            </Segment>
                        </Grid.Column>
                    </Grid>


                </Container>
                <Container fluid className="bottom">

                    <Grid padded textAlign="center" >
                        <Grid.Column>
                            <Grid.Row>
                                <h2>Recent Projects</h2>
                            </Grid.Row>
                            <Divider />
                            <Grid.Row onClick={this.onClick}>
                                <h4>Project 1</h4>
                            </Grid.Row>
                                <Divider />
                            <Grid.Row onClick={this.onClick} >
                                <h4>Project 2</h4>
                            </Grid.Row>
                                <Divider />
                            <Grid.Row onClick={this.onClick}>
                                <h4>Project 3</h4>
                            </Grid.Row>
                                <Divider />
                        </Grid.Column>
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default Home;
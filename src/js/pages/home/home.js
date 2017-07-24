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

                <Container className="yellowBarHome" fluid />


                <Container className="top" fluid >

                    <Grid columns={2} className="grid">
                        <Grid.Column width={5} verticalAlign="middle">
                            <Image src="https://files.slack.com/files-pri/T5RBHJC4T-F6BJNKZ7T/hands.png" alt="image goes here" />

                        </Grid.Column>
                        <Grid.Column verticalAlign="middle">

                            <h1>Welcome to Translation Manager! </h1>
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
                            <Grid.Row onClick={this.onClick} className="project">
                                <h4>Mark - en-x-demo2 - ULB</h4>
                            </Grid.Row>
                                <Divider />
                            <Grid.Row onClick={this.onClick} >
                                <h4>Romans - Español Latin America - UDB</h4>
                            </Grid.Row>
                                <Divider />
                            <Grid.Row onClick={this.onClick}>
                                <h4>Psalms - Mandarin - ULB</h4>
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
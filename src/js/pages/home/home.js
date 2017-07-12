import React, { Component } from 'react';
import {
    Container, Row, Col, Jumbotron, InputGroup, Input, InputGroupAddon, InputGroupButton,
} from 'reactstrap';

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
    render() {
        return (
            <div>
                <Jumbotron>
                    <Container>
                        <Row>
                            <Col>
                            <h1>Welcome to Translation Manager</h1>

                             </Col>
                        </Row>
                <InputGroup>
                <Input placeholder="username" />
                    <InputGroupButton color="success">Submit</InputGroupButton>
                {/*<InputGroupAddon>Submit</InputGroupAddon>*/}
                </InputGroup>

                </Container>
                </Jumbotron>
            </div>
        );
    }
}

export default Home;
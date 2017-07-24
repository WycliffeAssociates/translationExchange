import React, { Component } from 'react';
import { Button, Header, Image, Modal, Container, Segment, Grid, Form, Table, Divider } from 'semantic-ui-react'
import 'css/home.css'
import hands from 'images/hands.png'
import axios from 'axios'
import config from 'config/config'
import QueryString from 'query-string';
import combinedShape from 'images/combined-shape.png'


class Home extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            projects: []
        };

        this.getRecentProjects()
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    getRecentProjects() {
        axios.post(config.apiUrl + 'all_projects/', {}
        ).then((results) => {
            this.setState({projects: results.data})
            this.reduceState()
        }).catch((exception) => {
            this.setState({error: exception});
        });
    }

    reduceState() {
        if (this.state.projects.length > 4) {
            this.setState({
                projects: this.state.projects.splice(0, 5)
            })
        }
    }

    navigateToProject (language, book, version) {
        //make the query for the right project, using our current query as a base
        var projectQuery = QueryString.parse(this.state.currentProjectQuery);
        Object.assign(projectQuery, {
            language: language,
            book: book,
            version: version
        });

        var queryString = QueryString.stringify(projectQuery);
        this.props.history.push(
            {
                pathname: '/chapters',
                search: "?" + queryString
            }
        )
    }

    render() {

        //this.buildProjectsList()

        return (

            <div>


                <Container className="yellowBarHome" fluid />
                <Container className="top" fluid >

                    <Grid columns={2} className="middle">
                        <Grid.Row height={3}/>
                        <Grid.Column width={5} verticalAlign="middle">
                            <Image src={hands} alt="image goes here" />
                        </Grid.Column>
                        <Grid.Column verticalAlign="middle">

                            <h1>Welcome to the Website!</h1>
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
                    <Container fluid className="yellowBar" />

                    <Grid padded textAlign="center" >
                        <Grid.Column width={5}>
                            <Grid.Row height={1}>
                                <h1>Recent Projects</h1>
                            </Grid.Row>
                            <Divider />
                            {this.state.projects.map(this.createListItem.bind(this))}
                        </Grid.Column>
                    </Grid>
                </Container>

            </div>
        );
    }

    createListItem(projects) {

        var navigateToProject = (function () {
            this.navigateToProject(projects.language.slug, projects.book.slug, projects.version);
        }).bind(this);


        console.log(projects)

        var str = ''
        str += projects.book.name + ' '
        str += projects.language.name + ' '
        str += projects.version

        return(
            <div>
                <Grid.Row divided onClick={navigateToProject} className="hoverButton">
                    <h2> <Image verticalAlign="middle" src={combinedShape} size="mini"/> {str}</h2>
                </Grid.Row>
            </div>

        );


    }
}

export default Home;

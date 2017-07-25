import React, { Component } from 'react';
import { Button, Header, Image, Modal, Container, Segment, Grid, Form, Table, Divider, Label } from 'semantic-ui-react'
import 'css/home.css'
import axios from 'axios'
import config from 'config/config'
import QueryString from 'query-string';
import trap from 'images/trap.svg'
import logo from 'images/logo.png'
import {Link} from 'react-router-dom'

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



        return (

            <Container fluid className="background">



                <Container fluid>
                    <br />
                    <Image fluid src={trap} />
                    <div className="title"><font size="50">Translation made available </font></div>

                    <div className="logo">
                        <Image src={logo} className="logoterra" />
                    </div>
                    <div className="start-here">
                        <Link to="/projects">
                            <Button icon="right arrow" content='Start here' labelPosition="right"/>
                        </Link>
                    </div>

                </Container>










                <Container fluid >

                    <Grid padded textAlign="center" >
                        <Grid.Column width={3}>
                            <Grid.Row height={1}>
                                <h2><font color="white">Recent Projects</font></h2>
                            </Grid.Row>
                            <Divider />

                            {this.state.projects.map(this.createListItem.bind(this))}
                        </Grid.Column>
                    </Grid>
                </Container>


            </Container>
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
                    <h4><font color="white"> {str}</font></h4>
                </Grid.Row>
            </div>

        );


    }
}

export default Home;
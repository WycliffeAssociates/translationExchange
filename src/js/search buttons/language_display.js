import React, { Component } from 'react';
import {Button, Col, FormGroup, Input, Jumbotron, Label} from "reactstrap";

class ProjectsListContainer extends Component {
    /*
     In the constructor, set the state to being empty so the component
     can render without errors before the API request finishes
     */
    constructor(props) {
        super(props);
        this.state = {projects:[]};
    }

    /*
     In componentDidMount, do the API request for the data and then use
     setState to put the data in state
     */
    componentDidMount() {
        //I would do a web request here...
        //Just going to put fake data in state instead
        this.setState({projects:
            [
                {
                    id: 16,
                    book: "Matthew",
                    language: "English",
                    translationType: "Unlocked Literal Bible",
                    percentFinished: 5.6,
                    contributors: ["Alison"],
                    dateModified: "20 June 2017 4:16 pm"
                },
                {
                    id: 17,
                    book: "Mark",
                    language: "English",
                    translationType: "Unlocked Literal Bible",
                    percentFinished: 5.6,
                    contributors: ["Alison"],
                    dateModified: "20 June 2017 4:16 pm"
                },
                {
                    id: 18,
                    book: "Luke",
                    language: "English",
                    translationType: "Unlocked Literal Bible",
                    percentFinished: 5.6,
                    contributors: ["Alison"],
                    dateModified: "20 June 2017 4:16 pm"
                }
            ]
        });
    }

    /*
     In render, just render a child presentation component, passing it
     the data as props
     */
    render () {
        return (
            <div>
                <Jumbotron style={{  margin: '10%', marginTop:'7%', padding: '3px', fontSize: '15px', backgroundColor:'#D4D4D4', borderRadius: '25px'}}>
                    <h1 style={{textAlign: 'center', fontSize: '23px', color:'white', fontWeight:'bold'}} className="display-3">select language</h1>

                    <Jumbotron fluid style={{backgroundColor: 'white', padding: '15px', paddingBottom:'30px'}}>
                        <FormGroup>
                            <h1 style={{textAlign: 'center', fontSize: '23px'}} className="display-3">select the following</h1>

                            <FormGroup>

                                <Input type="search" name="search" id="exampleSearch" placeholder="search" />
                            </FormGroup>
                            <Label for="exampleSearch">Choose Target Language</Label>

                            <Input type="select" name="selectMulti" id="exampleSelectMulti" style = {{height: '300px', fontSize: '30px' }} multiple>
                                <option>English</option>
                                <option>Spanish</option>
                                <option>Korean</option>
                                <option>German</option>
                            </Input>

                        </FormGroup>
                        {/*<ProjectsList projects={this.state.projects}/>*/}
                    </Jumbotron>

                </Jumbotron>
            </div>
        );
    }
}

export default ProjectsListContainer;
/**
 * Created by DennisMarchuk on 7/7/2017.
 */

import React, { Component } from 'react';
import {Button, Col, FormGroup, Input, Jumbotron, Label} from "reactstrap";
import axios from 'axios'
import config from 'config/config';
import LoadingDisplay from 'js/components/LoadingDisplay';


class BooksDisplay extends Component {
    /*
     In the constructor, set the state to being empty so the component
     can render without errors before the API request finishes
     */
    constructor(props) {
        super(props);
        this.state = {loaded: false, error: "", projects:[]};
    }

    /*
     In componentDidMount, do the API request for the data and then use
     setState to put the data in state
     */

    componentDidMount() {
        this.setState({error: ""});
        axios.get(config.apiUrl + 'books/'
        ).then(results => {
            this.setState({
                loaded: true,
                projects: results.data
            })
        }).catch(exception => {
            this.setState({error: exception});
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
                    <h1 style={{textAlign: 'center', fontSize: '23px', color:'white', fontWeight:'bold'}} className="display-3">select book</h1>

                    <Jumbotron fluid style={{backgroundColor: 'white', padding: '15px', paddingBottom:'30px'}}>
                        <FormGroup>
                            <h1 style={{textAlign: 'center', fontSize: '23px'}} className="display-3">select the following</h1>

                            <FormGroup>

                                <Input type="search" name="search" id="exampleSearch" placeholder="search" />
                            </FormGroup>
                            <Label for="exampleSearch">Choose Book</Label>

                            <LoadingDisplay loaded={this.state.loaded}
                                            error={this.state.error}
                                            retry={this.componentDidMount.bind(this)}>
                                <Input type="select" name="selectMulti" id="exampleSelectMulti" style = {{height: '300px', fontSize: '20px' }} multiple>
                                    {this.state.projects.map((project) => <option>{project.name}</option>)}

                                </Input>
                            </LoadingDisplay>

                        </FormGroup>

                    </Jumbotron>

                </Jumbotron>
            </div>
        );
    }
}

export default BooksDisplay;
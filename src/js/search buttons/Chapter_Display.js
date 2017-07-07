/**
 * Created by ericazhong on 7/7/17.
 */
import React, { Component } from 'react';
import {Button, Col, FormGroup, Input, Jumbotron, Label} from "reactstrap";
import axios from 'axios';
import ProjectsList from "../pages/projects/ProjectsList";
class BookDisplay extends Component {
    /*
     In the constructor, set the state to being empty so the component
     can render without errors before the API request finishes
     */
    //

    constructor(props) {
        super(props);
        this.state = {
            language:props,
            value:'',
        chapters: []};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('Your selected chapter is: ' + this.state.value);
        event.preventDefault();
    }

    componentDidMount(props) {
        axios.post('http://172.19.145.91:8000/api/get_project/', {
            "language": props
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })}

    /*
     In componentDidMount, do the API request for the data and then use
     setState to put the data in state
     */

    /*
     In render, just render a child presentation component, passing it
     the data as props
     */


    render () {
        // return (
        //     <div>
        //
        //         <Jumbotron style={{  margin: '10%', marginTop:'7%', padding: '3px', fontSize: '15px', backgroundColor:'#D4D4D4',}}>
        //             <h1 style={{textAlign: 'center', fontSize: '23px', color:'white', fontWeight:'bold'}} className="display-3">select language</h1>
        //
        //             <Jumbotron fluid style={{backgroundColor: 'white', padding: '15px', paddingBottom:'30px'}}>
        //                 <FormGroup>
        //                     <h1 style={{textAlign: 'center', fontSize: '23px'}} className="display-3">select the following</h1>
        //
        //                     <FormGroup>
        //                         <Input type="search" name="search" id="exampleSearch" placeholder="search" />
        //                     </FormGroup>
        //
        //                     <Label for="exampleSearch">Choose Chapter</Label>
        //
        //                     <Input type="select" name="selectMulti" id="exampleSelectMulti" style = {{height: '300px', fontSize: '30px' }} multiple>
        //                         {this.state.projects.map((project) => <option>{project.name}</option>)}
        //                     </Input>
        //
        //                 </FormGroup>
        //             </Jumbotron>
        //
        //         </Jumbotron>
        //     </div>
        // );
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Select Chapter
                    <select className="selectpicker" value={this.state.value} onChange={this.handleChange}>
                        {this.state.chapters.map((take) => <option value = {take.chapter}>{take.chapter}</option>)}
                    </select>
                </label>
                <input type="submit" value="Submit" />
            </form>
        )
    }
}

export default BookDisplay;
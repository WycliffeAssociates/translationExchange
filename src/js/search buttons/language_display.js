import React, { Component } from 'react';
import axios from 'axios';
import BookDisplay from "./Chapter_Display";

class LanguageDisplay extends Component {
    /*
     In the constructor, set the state to being empty so the component
     can render without errors before the API request finishes
     */
    constructor(props) {
        super(props);
        this.state = {
            projects:[],
            value:''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('Your selected language is: ' + this.state.value);
        <BookDisplay lang={this.state.value}/>;
        event.preventDefault();
    }

    componentDidMount() {
        axios.get('http://172.19.145.91:8000/api/languages/')
            .then(results => {
                this.setState({
                    projects: results.data

                })
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
        //                     <Input type="search" name="search" id="exampleSearch" placeholder="search" />
        //                 </FormGroup>
        //
        //                 <FormGroup onSubmit={this.handleSubmit}>
        //                     <h1 style={{textAlign: 'center', fontSize: '23px'}} className="display-3">select the following</h1>
        //
        //                     <Label for="exampleSearch">Choose Target Language</Label>
        //
        //                     <Input value={this.state.value} onChange={this.handleChange} multiple ref="language" type="select" name="selectMulti" id="exampleSelectMulti" style = {{height: '300px', fontSize: '30px' }}>
        //                         {this.state.projects.map((project) => <option value = {project.name}>{project.name}</option>)}
        //                     </Input>
        //                     <input type="submit" value="Submit" />
        //
        //                 </FormGroup>
        //
        //             </Jumbotron>
        //
        //         </Jumbotron>
        //     </div>
        // );

        return (


        <form onSubmit={this.handleSubmit}>
                <label>
                    Select Target Language
                    <select className="selectpicker" value={this.state.value} onChange={this.handleChange}>
                        {this.state.projects.map((project) => <option value = {project.name}>{project.name}</option>)}
                    </select>
                </label>
                <input type="submit" value="Submit" />
            </form>

        );
    }
}

export default LanguageDisplay;
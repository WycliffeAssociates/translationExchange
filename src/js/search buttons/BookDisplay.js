import React, { Component } from 'react';
import {Button, Col, FormGroup, Input, Jumbotron, Label} from "reactstrap";
import axios from 'axios';

class BookDisplay extends Component {
    /*
     In the constructor, set the state to being empty so the component
     can render without errors before the API request finishes
     */

    constructor(props) {
        super(props);
        this.state = {
            books:[],
            value:''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('Your selected book is: ' + this.state.value);
        event.preventDefault();
    }

    componentDidMount() {
        axios.post('http://172.19.145.91:8000/api/get_project/', {
            "language": "en-x-demo2"
        })
            .then(results => {
                this.setState({
                    books: results.data
                })
            })}

    /*
     In componentDidMount, do the API request for the data and then use
     setState to put the data in state
     */


    // componentDidMount() {
    //     //I would do a web request here...
    //     //Just going to put fake data in state instead
    //     this.setState({projects:
    //         [
    //             {
    //                 id: 16,
    //                 book: "Matthew",
    //                 language: "English",
    //                 translationType: "Unlocked Literal Bible",
    //                 percentFinished: 5.6,
    //                 contributors: ["Alison"],
    //                 dateModified: "20 June 2017 4:16 pm"
    //             },
    //             {
    //                 id: 17,
    //                 book: "Mark",
    //                 language: "English",
    //                 translationType: "Unlocked Literal Bible",
    //                 percentFinished: 5.6,
    //                 contributors: ["Alison"],
    //                 dateModified: "20 June 2017 4:16 pm"
    //             },
    //             {
    //                 id: 18,
    //                 book: "Luke",
    //                 language: "English",
    //                 translationType: "Unlocked Literal Bible",
    //                 percentFinished: 5.6,
    //                 contributors: ["Alison"],
    //                 dateModified: "20 June 2017 4:16 pm"
    //             }
    //         ]
    //     });
    // }

    /*
     In render, just render a child presentation component, passing it
     the data as props
     */
    render () {
        // return (
        //     <div>
        //         <Jumbotron style={{  margin: '10%', marginTop:'7%', padding: '3px', fontSize: '15px', backgroundColor:'#D4D4D4', borderRadius: '25px'}}>
        //             <h1 style={{textAlign: 'center', fontSize: '23px', color:'white', fontWeight:'bold'}} className="display-3">select book</h1>
        //
        //             <Jumbotron fluid style={{backgroundColor: 'white', padding: '15px', paddingBottom:'30px'}}>
        //                 <FormGroup>
        //                     <h1 style={{textAlign: 'center', fontSize: '23px'}} className="display-3">select the following</h1>
        //
        //                     <FormGroup>
        //
        //                         <Input type="search" name="search" id="exampleSearch" placeholder="search" />
        //                     </FormGroup>
        //                     <Label for="exampleSearch">Choose Book</Label>
        //
        //                     <Input type="select" name="selectMulti" id="exampleSelectMulti" style = {{height: '300px', fontSize: '20px' }} multiple>
        //                         <option>Old Testament/Unlocked Literal Bible</option>
        //                         <option>New Testament/Unlocked Literal Bible</option>
        //                         <option>Old Testament/Unlocked Dynamic Bible</option>
        //                         <option>New Testament/Unlocked Dynamic Bible</option>
        //                         <option>Old Testament/Regular</option>
        //                         <option>New Testament/Regular</option>
        //                     </Input>
        //
        //                 </FormGroup>
        //                 {/*<ProjectsList projects={this.state.projects}/>*/}
        //             </Jumbotron>
        //
        //         </Jumbotron>
        //     </div>
        // );

        return (


            <form onSubmit={this.handleSubmit}>
                <label>
                    Select Book
                    <select className="selectpicker" value={this.state.value} onChange={this.handleChange}>
                        {this.state.books.map((book) => <option value = {book.book}>{book.book}</option>)}
                    </select>
                </label>
                <input type="submit" value="Submit" />
            </form>

        );
    }
}

export default BookDisplay;
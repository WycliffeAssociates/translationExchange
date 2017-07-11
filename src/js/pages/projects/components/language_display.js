import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react'
import axios from 'axios'
import {languageOptions} from "./common";
import config from 'config/config';

class LanguageDropdown extends Component {
    /*
     In the constructor, set the state to being empty so the component
     can render without errors before the API request finishes
     */
    constructor(props) {
        super(props);
        this.state = {loaded: false, error: "", languages:[]};
    }

    /*
     In componentDidMount, do the API request for the data and then use
     setState to put the data in state
     */
    componentDidMount() {
        this.setState({error: ""});

        axios.get(config.apiUrl + 'languages/'
        ).then(results => {
                this.setState({
                    loaded: true,
                    languages: results.data
                })
        }).catch(exception => {
            this.setState({error: exception});
        });
    }

        //I would do a web request here...
        //Just going to put fake data in state instead

    render () {
        return (
            <div>
                {/*<Jumbotron style={{  margin: '10%', marginTop:'7%', padding: '3px', fontSize: '15px', backgroundColor:'#D4D4D4', borderRadius: '25px'}}>*/}
                    {/*<h1 style={{textAlign: 'center', fontSize: '23px', color:'white', fontWeight:'bold'}} className="display-3">select language</h1>*/}

                    {/*<Jumbotron fluid style={{backgroundColor: 'white', padding: '15px', paddingBottom:'30px'}}>*/}
                        {/*<FormGroup>*/}
                            {/*<h1 style={{textAlign: 'center', fontSize: '23px'}} className="display-3">select the following</h1>*/}

                            {/*<FormGroup>*/}

                                {/*<Input type="search" name="search" id="exampleSearch" placeholder="search" />*/}
                            {/*</FormGroup>*/}
                            {/*<Label for="exampleSearch">Choose Target Language</Label>*/}

                            {/*<LoadingDisplay loaded={this.state.loaded}*/}
                                            {/*error={this.state.error}*/}
                                            {/*retry={this.componentDidMount.bind(this)}>*/}
                                {/*<Input type="select" name="selectMulti" id="exampleSelectMulti" style = {{height: '300px', fontSize: '30px' }} multiple>*/}

                                        {/*{this.state.languages.map((language) => <option>{language.name}</option>)}*/}

                                {/*</Input>*/}
                            {/*</LoadingDisplay>*/}

                <Dropdown text='Select Language'
                          search
                          floating
                          labeled
                          button
                          className='icon'
                          icon='world'
                          options={languageOptions}
                />
            </div>
        );
    }

}

export default LanguageDropdown;
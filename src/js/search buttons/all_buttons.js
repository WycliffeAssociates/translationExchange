import React , {Component} from 'react';
import LanguageButton from './language_button'
import VersionButton from './BookButton'
import './buttons_properties.css'
import BookButton from "./Chapter_Button";

class SearchButtons extends Component {

    constructor(props){
        super(props);
    }

    render (){

        return (
            <div style={{paddingTop:'65px', paddingLeft:'30px', paddingBottom:'20px'}}>
                <LanguageButton className="searchbuttons"/>
                <VersionButton className="searchbuttons"/>
                <BookButton classNae="searchbuttons"/>
            </div>

        );
    }
}
export default SearchButtons;
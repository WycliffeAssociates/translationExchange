import React , {Component} from 'react';
<<<<<<< HEAD:src/js/search buttons/all_buttons.js
import LanguageButton from './language_button'
import VersionButton from './BookButton'
import './buttons_properties.css'
import BookButton from "./Chapter_Button";
=======
import LanguageDropdown from './language_dropdown'
import BooksDropdown from './books_display'
import VersionDropdown from './version_display'
>>>>>>> M&R_Dev:src/js/pages/projects/components/all_buttons.js

class SearchButtons extends Component {

    render (){

        return (
<<<<<<< HEAD:src/js/search buttons/all_buttons.js
            <div style={{paddingTop:'65px', paddingLeft:'30px', paddingBottom:'20px'}}>
                <LanguageButton className="searchbuttons"/>
                <VersionButton className="searchbuttons"/>
                <BookButton classNae="searchbuttons"/>
=======
            <div style={{paddingLeft:'30px', paddingBottom:'20px'}}>
                <LanguageDropdown/>
                {/*<BooksDropdown/>*/}
                {/*<VersionDropdown/>*/}

>>>>>>> M&R_Dev:src/js/pages/projects/components/all_buttons.js
            </div>

        );
    }
}
export default SearchButtons;
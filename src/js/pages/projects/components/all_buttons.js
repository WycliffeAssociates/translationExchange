import React , {Component} from 'react';
import LanguageDropdown from './language_display'
import BooksDropdown from './books_display'
import VersionDropdown from './version_display'

class SearchButtons extends Component {

    render (){

        return (
            <div style={{paddingLeft:'30px', paddingBottom:'20px'}}>
                <LanguageDropdown/>
                <BooksDropdown/>
                <VersionDropdown/>

            </div>

        );
    }
}
export default SearchButtons;
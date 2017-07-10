import React , {Component} from 'react';
import LanguageButton from './language_button'
import VersionButton from './version_button'
import './buttons_properties.css'
import LanguageDropdown from './language_display'
import BooksButton from './books_button'

class SearchButtons extends Component {

    render (){

        return (
            <div style={{paddingLeft:'30px', paddingBottom:'20px'}}>
                <LanguageDropdown/>
                {/*<LanguageButton className="searchbuttons"/>*/}
                {/*<VersionButton className="searchbuttons"/>*/}
                {/*<BooksButton className="booksbutton"/>*/}

            </div>

        );
    }
}
export default SearchButtons;
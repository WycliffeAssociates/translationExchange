import React , {Component} from 'react';
import LanguageButton from './language_button'
import VersionButton from './version_button'


class SearchButtons extends Component {

    constructor(props){
        super(props);
    }

    render (){

        return (
            <div className="search-buttons" style={{paddingTop:'65px'}}>
                <LanguageButton/>
                <VersionButton />

            </div>

        );
    }
}
export default SearchButtons;
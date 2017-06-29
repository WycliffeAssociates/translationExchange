import React , {Component} from 'react';
import LanguageButton from './language_button'
import BookButton from './book_button'
import ChunkButton from './chunk_button';
import ChapterButton from './chapter_button';

class SearchButtons extends Component {

    constructor(props){
        super(props);
    }

    render (){

        return (
            <div className="search-buttons" style={{paddingTop:'65px'}}>

                <BookButton/>
                <ChapterButton/>
                <ChunkButton/>
                <LanguageButton />

            </div>

        );
    }
}
export default SearchButtons;
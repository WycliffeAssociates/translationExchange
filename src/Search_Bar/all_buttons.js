import React , {Component} from 'react';
import {Navbar, Nav, NavItem, MenuItem, NavDropdown,Button} from 'react-bootstrap';
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
            <div className="search-buttons">
                <LanguageButton />
                <BookButton/>
                <ChapterButton/>
                <ChunkButton/>
            </div>



        );


    }




}



export default SearchButtons;
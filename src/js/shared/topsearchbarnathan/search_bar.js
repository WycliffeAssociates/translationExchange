import React , {Component} from 'react';
import {Navbar, Nav, NavItem, MenuItem, NavDropdown,Button} from 'react-bootstrap';
import LanguageButton from './search_language'
import BookButton from './search_book'
import ChunkButton from './search_chunk';
import ChapterButton from './search_chapter';


class SearchBar extends Component {


    constructor(props){
        super(props);

    }


    render (){

       return (
           <Navbar inverse collapseOnSelect  fixedTop = {true}  >
               <Navbar.Header>
                   <Navbar.Brand>
                       <a href="#">Translation Manager</a>

                   </Navbar.Brand>
                   <Navbar.Toggle />
               </Navbar.Header>
               <Navbar.Collapse>
                   <Nav>

                       <LanguageButton/>
                       <BookButton/>
                       <ChapterButton/>
                       <ChunkButton/>

                   </Nav>

               </Navbar.Collapse>
           </Navbar>
       );


    }
}



export default SearchBar;



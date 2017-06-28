import React , {Component} from 'react';
import {Navbar, Nav, NavItem, MenuItem, NavDropdown,Button} from 'react-bootstrap';
import LanguageButton from './language_button'
import BookButton from './book_button'
import ChunkButton from './chunk_button';
import ChapterButton from './chapter_button';


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


                   </Nav>

               </Navbar.Collapse>
           </Navbar>
       );


    }






}



export default SearchBar;



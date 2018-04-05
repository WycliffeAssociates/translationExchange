import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import QueryString from "query-string";
import NavBar from '../../components/NavBar';
import {getChunks, getComments, getUserHash, getChapters} from '../../actions';
import ChapterCard from './components/ChapterCard';
import styled from 'styled-components';
import 'css/takes.css';





class ChapterPage extends Component {

    componentWillMount() {
        const {getChapters, chapters} = this.props;

        if(chapters.length < 1) {
            const {search} = this.props.location;   //get data if the user refresh the page
            const query = QueryString.parse(search);
            getChapters(query.projectId);
        }

    }

    render() {
        const {chapters} = this.props;

        return (
            <ChapterPageContainer>
                <NavBar kanban={false} {...this.props} />

                <CardsContainer>
                    {chapters.map(chp => <ChapterCard {...chp} {...this.props} />)}

                </CardsContainer>

            </ChapterPageContainer>
        );
    }

}


const ChapterPageContainer = styled.div`
    display: flex;
    position:fixed;
    padding:0;
    margin:0;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    min-height: 850px;
    flex-direction: column;
    background-color: #F7F9FE
`;

const CardsContainer = styled.div`
    height:100%;
    min-height: 850px;
    overflow-y: scroll;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding-top: 3vw;
    padding-left: 1vw;
   
`;



const mapDispatchToProps = dispatch => {

    return bindActionCreators({getChunks, getUserHash, getComments, getChapters}, dispatch);

};

const mapStateToProps = state => {

    const {chapters} =state.Chapters;

    const {loggedInUser} =state.user;


    return {chapters, loggedInUser};
};


export default connect(mapStateToProps,mapDispatchToProps)(ChapterPage);

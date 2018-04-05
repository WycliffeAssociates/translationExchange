import React, {Component} from 'react';
import styled from 'styled-components';
import CircularProgressbar from "react-circular-progressbar";



export default class ChapterCard extends Component {

    reviewChapter = () => {
        const {id, getChunks, history, number, getComments } = this.props;
        getChunks(id);     // chapter id
        getComments(id, 'chapter_id');

        history.push({
            pathname: './kanban',
            search: `?chapterId=${id}&&chapterNum=${number}`
        });

    };

    componentDidMount(){
        const test = this.props;
        debugger;

    }

    render() {
        const{ completed, number } = this.props;

        return (

                <Card>
                    <InformationContainer >
                        <TextContainer>
                            <P>Chapter {number}</P>
                        </TextContainer>
                    </InformationContainer>
                    <CircularProgressContainer>
                                <CircularProgressbar
                                    percentage={20}
                                    textForPercentage={null}
                                />

                    </CircularProgressContainer>

                    <ButtonContainer>
                        <ReviewButton onClick={this.reviewChapter}> <i class="material-icons">done_all</i> Review </ReviewButton>
                    </ButtonContainer>
                </Card>


        );
    }

}







const Card= styled.div`
    text-align: center;
    height: 22vw;
    width: 17vw;
    border-radius: .5vw;
    box-shadow: 0px 1px 2px 4px rgba(0,0,0,0.2);
    overflow: hidden;
    background-color: white;
    
`;

const ReviewButton= styled.button`
  border-radius: 20px;
  color: white;
  background: linear-gradient(to bottom,${props => props.error ? '#E74C3C, #820C00': '#0076FF, #00C5FF'} );
  padding: 0.4vw 4vw;
  font-size: 1.1vw;
  font-weight: 100;
  border: none;
  text-decoration: underline;
  box-shadow: 1px 1px 1px rgba(0,0,0,0.5);
  outline:none;
  cursor: pointer;
`;

const CircularProgressContainer = styled.div`
    display: flex;
    justify-content:center;
    height: 75%;
    align-items:center;
    
`;


const P = styled.p`
   font-size: 1.2vw
   font-weight: bold;
`;

const InformationContainer = styled.div`
  
`;


const TextContainer = styled.div`
  padding-top: .5vw;
  padding-left: .7vw;
  width: 45%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;


`;

const ButtonContainer= styled.div`
    width: inherit;
    overflow: hidden;
    text-align: center;
    border-color: white;
    border-width: 1vw;
  `;



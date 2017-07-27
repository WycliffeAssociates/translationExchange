import React, {Component} from 'react';
import PropTypes from "prop-types";
import MarkAsDone from "./MarkAsDone";
import CommentContainer from "./comments/PinkButton"
import SetSourceAudio from "./SetSourceAudio"
import PinkButton from "./comments/PinkButton";
import {Button, Grid, Icon} from "semantic-ui-react";
import 'css/takes.css'

class ChapterHeader extends Component {
    render() {

        return (
            // <h1 marginWidth={25}>
    //         Chapter {this.props.chapter.number}
    //         {this.props.loaded
    //             ? " (" + this.props.book + ", " + this.props.language + ")"
    //             : ""
    //         }
    //
    //     <CommentContainer
    //         ref={instance => (this.commentContainer = instance)}
    //         comments={this.props.chapter.comments}
    //         id={this.props.chapter.id}
    //         onClickSave={this.props.onClickSave}
    //         type={"chapter"}
    //         deleteComment={this.props.deleteComment}
    //     />
    //     <MarkAsDone chapter={this.props.chapter}
    //
    //                 language={this.props.language}
    //                 chunks={this.props.chunks}
    //                 mode={this.props.mode}
    //     />
    //     <SetSourceAudio/>
    // </h1>
            <div className="headerStyle">

                <Grid padded columns={2} >
                    <Grid.Column width={11} style={{paddingTop: 23}}>
                        {this.props.book} Chapter {this.props.chapter.number} ({this.props.language})
                    </Grid.Column>

                    <Grid.Column width={5} className="verticalLine">

                        {/*<Button icon color="black" onClick={()=> alert("compile and publish")}>*/}
                            {/*<Icon color="white" name="sidebar"/>*/}
                        {/*</Button>*/}
                        <MarkAsDone chapter={this.props.chapter} chunks={this.props.chunks} mode={this.props.mode}/>

                        {/*<Button style={{marginLeft: 5, marginRight: 7}} icon color="black" onClick={()=> alert("source audio")}>*/}
                            {/*<Icon color="white" name="als"/>*/}
                        {/*</Button>*/}
                        <SetSourceAudio selectedSourceProject={this.props.selectedSourceProject}
                                        setSourceProject={this.props.setSourceProject}/>

                        <PinkButton comments={this.props.chapter.comments}
                                    onClickSave={this.props.onClickSave}
                                    id={this.props.chapter.id}
                                    type={"chapter"}
                                    deleteComment={this.props.deleteComment}/>

                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}



export default ChapterHeader;
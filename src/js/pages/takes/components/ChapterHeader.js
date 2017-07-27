import React, {Component} from 'react';
import PinkButton from "./comments/PinkButton";
import {Button, Grid, Icon} from "semantic-ui-react";
import 'css/takes.css'

class ChapterHeader extends Component {
    render() {

        return (
            <div className="headerStyle">

                <Grid padded columns={2} >
                    <Grid.Column width={11} style={{paddingTop: 23}}>
                        {this.props.book} Chapter {this.props.number} ({this.props.language})
                    </Grid.Column>

                    <Grid.Column width={5} className="verticalLine">

                        <Button icon color="black" onClick={()=> alert("compile and publish")}>
                            <Icon color="white" name="sidebar"/>
                        </Button>

                        <Button style={{marginLeft: 5, marginRight: 7}} icon color="black" onClick={()=> alert("source audio")}>
                            <Icon color="white" name="als"/>
                        </Button>

                        <PinkButton comments={this.props.comments}
                                    onClickSave={this.props.onClickSave}
                                    id={this.props.id}
                                    type={"chapter"}
                                    deleteComment={this.props.deleteComment}/>

                    </Grid.Column>
                </Grid>
            </div>

        );
    }
}



export default ChapterHeader;
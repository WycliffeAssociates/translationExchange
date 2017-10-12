import React from 'react';
import { Grid, Segment } from "semantic-ui-react";
import StitchTakesButton from "./StitchTakesButton";
import TakeCommentsButton from "./comments/TakeCommentsButton";

const TakePreview = () =>{

return(

  <Segment>
    <Grid textAlign="left">
      <Grid.Row>
        <Grid.Column width={12}>
          <Grid.Row verticalAlign="top">
            <Grid>
              <Grid.Column width={11} floated="left">
                <font size="3">
                  <strong>
                    {this.props.displayText.take} {this.props.count} -{" "}
                  </strong>
                </font>
                <font size="2" color="grey">
                  {this.props.author
                    ? this.props.author.name
                    : "Unknown Author"}
                </font>
              </Grid.Column>
              <Grid.Column floated="right">
                <StitchTakesButton
                />
              </Grid.Column>
            </Grid>
          </Grid.Row>

          <Grid.Row>
            {this.parseDate(this.props.take.date_modified)}
          </Grid.Row>
          <Grid.Row className="centerPlayButton">
            <br />
            <TakeListenButton
              onClick={() => { this.playTakeFromCard(); }

              }
            />
          </Grid.Row>
          <Grid.Row verticalAlign="bottom">
            <br />
            <TakeCommentsButton
              take={this.props.take}
              comments={this.props.comments}
              onClickSave={this.props.onClickSave}
              deleteComment={this.props.deleteComment}
              loadingActive={this.props.active}
              count={this.props.count}
              chunkNumber={this.props.chunkNumber}
            />
          </Grid.Row>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Segment>


);




}

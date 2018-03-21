import React, { Component } from "react";
import { Label, Popup, Button, Header, Icon, Modal } from "semantic-ui-react";
import "css/popup-dialog.css";
import { CheckAllIcon } from "mdi-react";
class PopUpDialog extends Component {
  state = { open: false };

  show = dimmer => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });

  render() {
    const { open, dimmer } = this.state;
    return (
      <div>
        <Button onClick={this.show("blurring")}>Review</Button>
        <Modal
          dimmer={dimmer}
          open={open}
          onClose={this.close}
          className="container"
          closeIcon
          size="mini"
        >
          <Modal.Content>
            <Modal.Description style={{ color: "white", paddingTop: 75 }}>
              <Header style={{ color: "white" }}>
                <i className="fa fa-check fa-2x" color="white" />
                <p>Great Job!</p>
              </Header>
              <p>You completed all of the takes for chapter 1.</p>
              <p>Would you like to review the chapter?</p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <span style={{ float: "left", paddingTop: 12 }}>
              <Icon name="arrow right" color="blue" />{" "}
              <a style={{ textDecoration: "underline" }} href="#">
                Skip to Chapter 2
              </a>
            </span>
            <Button primary className="action">
              <CheckAllIcon color="white" />
              <span
                style={{
                  padding: 10,
                  fontSize: 16,
                  textDecoration: "underline"
                }}
              >
                Review Chapter 1
              </span>
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default PopUpDialog;

import React, { Component } from "react";
import { Label, Popup, Button, Header, Icon, Modal } from "semantic-ui-react";
import "css/popup-dialog.css";
import styled from 'styled-components';
import { CheckAllIcon, FlaskEmptyIcon } from "mdi-react";
class PopUpDialog extends Component {
  state = { open: false };

  show = dimmer => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });

  render() {
    const { open, dimmer } = this.state;
    const {icon,title,para1,para2,skipText,reviewText}=this.props;
    return (
      <div>
        <Button onClick={this.show("blurring")}>Review</Button>
        <Modal
          dimmer={dimmer}
          open={open}
          onClose={this.close}
          className="container"
          size="mini"
        >
          <Modal.Content>
         <Span onClick={()=>this.close()}>X</Span>
            <Modal.Description style={{ color: "white", paddingTop: 75 }}>
              <Header style={{ color: "white" }}>
                <i className={icon} color="white" />
                <p>{title}</p>
              </Header>
              <p>{para1}</p>
              <p>{para2}</p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <span style={{ float: "left", paddingTop: 4 }}>
              <Icon name="arrow right" color="blue" />{" "}
              <a style={{ textDecoration: "underline" ,marginRight:80}} href="#">
               {skipText}
              </a>
            </span>
            <div className='review-btn' onClick={()=>console.log("clicks")}>
              <CheckAllIcon color="white" />
              <span
                style={{
                  paddingLeft:5,
                  textDecoration: "underline"
                }}
              >
                {reviewText}
              </span>
              </div>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

const Span=styled.span`
color:white;
font-size:1.8vw;
position:absolute;
top:0.3vw;
right:.6vw;
cursor:pointer;
`
export default PopUpDialog;

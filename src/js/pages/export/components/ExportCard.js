import React, {Component} from 'react';
import styled, {keyframes} from 'styled-components';
import {zoomIn} from 'react-animations';



export class ExportCard extends Component {
  constructor(props) {
    super(props);
    this.state = { checked: false};
  }

  componentWillReceiveProps(nextProps) {
    if ( nextProps.checked !== this.props.checked || nextProps.checkedAll !== this.props.checkedAll) { //check if the state of the button select completed changed
      if ((nextProps.checked && nextProps.published) || nextProps.checkedAll) {                // button selected and the chapter is published, mark them as selected
        this.setState({checked: true});
        if (!this.state.checked) {             // to avoid adding them twice when they already selected
          nextProps.selections(nextProps.id, true);         // send id and number to save them into an array, true is used for saved, false for remove
        }
      }
      if ((!nextProps.checked || (nextProps.checked && !nextProps.published)) && !nextProps.checkedAll) {   // once we check the checkbox
        this.setState({checked: false});
        nextProps.selections(nextProps.id, false);
      }

    }
  }

  componentWillMount() {
    const {published, chapterComplete} = this.props;
    if (published) {
      chapterComplete();
    }
  }



  toggleCheck = () => {
    const {selections, id} = this.props;
    const {checked} = this.state;
    selections(id, !checked);
    this.setState({checked: !checked});

  };

  render() {
    const {published, number, has_takes} = this.props;
    const { checked } = this.state;
    let icon = 'chrome_reader_mode';
    if (published) {
      icon = 'done';
    }


    return (
      <Card published = {checked}>
        { has_takes ?
          <CheckBox checked={checked} onClick={this.toggleCheck}>
            {checked ? <i class="material-icons">done</i> : ''}
            <input id="checkBox" type="checkbox" checked={checked}  />
          </CheckBox>
          :
          ''
        }
        <IconContainer>
          <i class="material-icons">{icon}</i>
          <p>{number}</p>
        </IconContainer>
      </Card>
    );
  }
}

const zoomInAnimation = keyframes `${zoomIn}`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: ${props => props.published ? '#FFF': '#EEE'};
  box-shadow: ${props => props.published ? '0px 8px 6px rgba(0,0,0,0.2)': ''};
  text-align: center;
  height: 90px;
  width: 90px;
  border-radius: 1px;
  overflow: hidden;
  margin: 20px 20px 20px 20px;
  font-size: 27px;
  font-weight: bold;
  animation: ${zoomInAnimation} .2s ease-in;


  i{
    color: ${props => props.published ? '#43B52F': '#707070'}
    font-size: 37px;
  }

  p{
    color: ${props => props.published ? '#000': '#707070'}
  }


`;

Card.displayName = 'Card';

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  width: 80% ;
  justify-content: space-around;
`;

IconContainer.displayName ='IconContainer';

const CheckBox = styled.span`
 display: inline-block;
 position: relative;
 top: 3px;
 width: 18px;
 height: 18px;
 margin: -1px 0px 0 0;
 vertical-align: middle;
 background: ${props => props.checked ? '#43B52F' :'#EEEEEE' };
 border:${props => props.checked ? '2px solid #43B52F' :'2px solid #707070' };
 cursor: pointer;
 border-radius: 3px;

  input{
    display:none;
  }

  i{
    font-size: 18px;
    position: absolute;
    left:-2px;
    top: -2px;
    color: ${props => props.checked ? '#FFF' :'#EEEEEE' };
  }

`;

CheckBox.displayName = 'CheckBox';

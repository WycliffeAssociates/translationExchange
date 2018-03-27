import React from 'react';
import styled from 'styled-components';
import KanbanColumn from './KanbanColumn';


export default class KanbanBoard extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let column1 = [];
    let column2 = [];
    let column3 = [];
    let publishedColumn = [];

    this.props.takes.forEach((take) => {
      switch (take.rating) {
        case 0:
          column1.push(take);
          break;

        case 1:
          column1.push(take);
          break;

        case 2:
          column2.push(take);
          break;

        case 3:
          if (take.published == true) {
            publishedColumn.push(take);
          }

          else {
            column3.push(take);
          }
          break;

        default:
          column1.push(take);
          break;
      }
    });

    return (


      <Container>

        <KanbanColumn listId ={1} icon= {1} array = {column1} patchTake = {this.props.patchTake} takes={this.props.takes} displayText = {this.props.displayText} />
        <KanbanColumn listId ={2} icon= {2} array = {column2} patchTake = {this.props.patchTake} takes={this.props.takes} displayText = {this.props.displayText} />
        <KanbanColumn listId ={3} icon= {3} array = {column3} patchTake ={this.props.patchTake} takes={this.props.takes} displayText = {this.props.displayText} />
        <KanbanColumn listId ={4} icon= {4} array = {publishedColumn} patchTake ={this.props.patchTake} takes={this.props.takes} displayText = {this.props.displayText} />


      </Container>

    );
  }

}

const Container = styled.div`

  flex: 1
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-self: space-between;

`;

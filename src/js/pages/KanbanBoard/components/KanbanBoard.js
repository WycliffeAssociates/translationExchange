import React from 'react';
import styled from 'styled-components';
import KanbanColumn from './KanbanColumn';
import DeleteTake from './DeleteTake';




export default class KanbanBoard extends React.Component {

  constructor(props) {
    super(props);

    this.sortTakes = this.sortTakes.bind(this);
  }

  sortTakes(column1,column2,column3, publishedColumn) {

    this.props.takes.forEach((take) => {
      switch (take.rating) {
        case 0:
        case 1:
          if (take.published == true) {
            publishedColumn.push(take);
          }
          else column1.push(take);
          break;

        case 2:
          if (take.published == true) {
            publishedColumn.push(take);
          }
          else column2.push(take);
          break;

        case 3:
          if (take.published == true) {

            publishedColumn.push(take);
            //  this.props.addPublishedTake(take,);
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

    return [column1, column2, column3, publishedColumn];

  }

  render() {

    let array = this.sortTakes([], [],[], []);
    let column1 = array [0]; let column2 = array[1];
    let column3 = array[2]; let publishedColumn = array[3];

    const publishedTake = publishedColumn.length == 1? true: false;

    return (


      <Container>

        {/* the listId prop is needed for moving takes between different columns */}
        <KanbanColumn listId ={1} icon= {1} array = {column1} {...this.props} publishedTake = {publishedTake} />
        <KanbanColumn listId ={2} icon= {2} array = {column2} {...this.props} publishedTake = {publishedTake} />
        <KanbanColumn listId ={3} icon= {3} array = {column3} {...this.props} publishedTake = {publishedTake} />
        <KanbanColumn listId ={4} icon= {4} array = {publishedColumn} {...this.props} publishedTake = {publishedTake} publishedColumn={publishedTake} />

        <DeleteTake listId= {'DELETE_TAKE'} />

      </Container>

    );
  }

}



const Container = styled.div`

  flex: 1
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  // align-self: space-evenly;

`;
Container.displayName = 'Container';

import React from 'react';
import styled from 'styled-components';

import QueryString from 'query-string';
import update from 'immutability-helper';
import { takeId } from '../../../actions';

class TaskTitle extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    var query = QueryString.parse(this.props.location.search);
    var type = query.type || "upload";

    const lang_name = this.props.task.details.lang_name || "--";
    const lang_slug = this.props.task.details.lang_slug || "--";
    const book_name = this.props.task.details.book_name || "--";
    
    return (
      <Container>
        <BookTitle>{book_name != "--"? book_name: "Unknown"}</BookTitle>
        <LanguageTitle>{lang_name != "--"? lang_name + " (" + lang_slug.toUpperCase() + ")": "Unknown"}</LanguageTitle>
      </Container>
    );
  }

}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
`;

const LanguageTitle = styled.div`
  margin-top: 0.6vw;
  font-size: 1vw;
`;

const BookTitle = styled.div`
  margin-top: 0.4vw;
  font-size: 1vw;  
  font-weight: bold;
`;

export default TaskTitle;

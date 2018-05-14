import React from 'react';
import styled from 'styled-components';

class TaskTitle extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
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
Container.displayName = "Container";

const LanguageTitle = styled.div`
  margin-top: 0.6vw;
  font-size: 1vw;
`;
LanguageTitle.displayName = "LanguageTitle";

const BookTitle = styled.div`
  margin-top: 0.4vw;
  font-size: 1vw;  
  font-weight: bold;
`;
BookTitle.displayName = "BookTitle";

export default TaskTitle;

import React from 'react';
import styled from 'styled-components';
import GotoProjectButton from './GotoProjectButton';

class TaskInfo extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const lang_name = this.props.task.details.lang_name || '--';
    const lang_slug = this.props.task.details.lang_slug || '--';
    const book_name = this.props.task.details.book_name || '--';
    const file_name = this.props.task.details.file_name || '--';
    const title = this.props.task.status == 'SUCCESS' ? 'Success!' : 'Upload failed!';
    const title_color = this.props.task.status == 'SUCCESS' ? '#00c43d' : '#f64753';

    const details = this.props.task.status == 'SUCCESS'? (
      <div>
        <span style={{fontWeight: 'bold'}}>{book_name} </span>
        <span></span>{lang_name + ' (' + lang_slug.toUpperCase() + ')'}</div>
    ): (
      <div>
        <span>Your </span>
        <span style={{fontWeight: 'bold'}}>
          {book_name != '--' ? book_name + ' ' + lang_name + ' (' + lang_slug.toUpperCase() + ')' : (file_name != '--' ? file_name + " file" : 'unknown project')}
        </span>
        <span> failed to upload. Please see tech support.</span>
      </div>
    );

    const button = this.props.task.status == 'SUCCESS'? (
      <GotoProjectButton {...this.props}></GotoProjectButton>
    ): '';

    const date = new Date(this.props.task.started);

    return (
      <Container>
        <Title style={{color: title_color}}>{title}</Title>
        <Details>
          {details}
          <div style={{marginTop: '0.8vw', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <i className="material-icons" style={{marginRight: '0.4vw', color: '#9c79cf'}}>schedule</i>
            <span style={{fontWeight: 'bold', marginRight: '0.4vw'}}>{date.toLocaleDateString()} </span>
            <span>{date.toLocaleTimeString()}</span>
          </div>
        </Details>
        {button}
      </Container>
    );
  }

}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 10;
  align-items: center;
  justify-content: center;
  padding: 1vw 0;
`;
Container.displayName = 'Container';

const Title = styled.div`
  // margin-top: 1.5vw;
  font-size: 1vw;
  font-weight: bold;
  font-size: 1.3vw;
  flex: 1;
`;
Title.displayName = 'Title';

const Details = styled.div`
  // margin-top: 2vw;
  font-size: 1vw;
  flex: 2;
`;
Details.displayName = 'Details';

export default TaskInfo;

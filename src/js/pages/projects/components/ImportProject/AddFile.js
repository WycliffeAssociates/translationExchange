import React from 'react';
import styled from 'styled-components';

export default class AddFile extends React.Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.fileInput) this.props.importProject(this.fileInput.files[0]);
    this.props.history.push('/progress');
  }

  componentDidMount() {
    const {txt} = this.props;
    var inputs = document.querySelectorAll('.inputFile');
    var submit = document.querySelector('.submit');
    if (submit) {
      submit.style.opacity=0;
    }
    Array.prototype.forEach.call (inputs, function(input) {
      var label = input.nextElementSibling,
        labelVal = label.innerHTML;

      input.addEventListener('change', function(e) {
        var fileName = '';
        fileName = e.target.value.split('\\').pop();

        if (fileName && labelVal !== txt.get("chooseProject"))
        {
          label.querySelector('strong').innerHTML = fileName;
          submit.style.opacity=1;
        }
        else {
          label.innerHTML = labelVal;
          label.style.background= 'linear-gradient(to top, #0076FF, #00C5FF  )';
          submit.style.opacity=0;
        }
      });
    });
  }



  render() {
    const {txt} = this.props;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Container>
          <Input type="file" name="file" id="file" className="inputFile" accept= ".zip"  innerRef={input => {
            this.fileInput = input;}} />
          <label htmlFor="file" style={styles.label}> <i className="material-icons">create_new_folder</i> <strong>{txt.get("chooseProject")}</strong></label>
          <Submit className="submit" type="submit" > <strong>{txt.get("import")}</strong> </Submit>
        </Container>
      </Form>
    );
  }

}
const styles = {
  label: {
    cursor: 'pointer',
    width: '55%',
    height: 'auto',
    color: 'white',
    background: 'linear-gradient(to top, #0076FF, #00C5FF  )',
    border: 'none',
    borderRadius: '5px',
    verticalAlign: 'middle',
    minHeight: '40px',
    maxHeight: '80px',
    minWidth: '190px',
    maxWidth: '250px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '14px',
  },
};

const Form = styled.form`
  width: 100%;
  height: auto;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
Form.displayName= 'Form';

const Container = styled.div`
  width: inherit;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin: auto;
`;
Container.displayName= 'Container';

const Submit = styled.button`
  background: green;
  margin-top: 10px;
  width: 55%;
  height: auto;
  color: white;
  border: none;
  border-radius: 5px;
  text-decoration: underline;
  i{
    vertical-align: middle;
  }
  min-height: 40px;
  min-height: 40px;
  max-height: 80px;
  min-width: 190px;
  max-width: 250px;
  cursor: pointer;
  font-size: 14px;
`;
Submit.displayName= 'Submit';
const Input = styled.input`
  border: none;
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;
Input.displayName= 'Input';

import axios from 'axios';

export function GET_AUTH_TOKEN(code) {

  return (dispatch) => {
    axios.post('https://github.com/login/oauth/access_token', {
      client_id: 'f570d7b8fb0342eb629b',
      client_secret: '687a85aafd8058fd9978e40d5c3705b5724677b9' ,
      code: code,
      accept: 'json',
    })
      .then(function(err,response) {
        console.log(response);
      });

  };

}

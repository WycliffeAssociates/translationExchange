import axios from 'axios';
import config from '../../config/config.js';

export function dispatchToken(id_token) {

return (dispatch) => {

    axios.post(`${config.database}`, {
      id_token: id_token })

      .then( function(err, response) {
        console.log(response);
      });

  };


}

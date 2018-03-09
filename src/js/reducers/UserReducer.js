export const initialState = ({

  users: [{hash: 'FFngfh546535462', recording: 'none'}],


});

function userReducer( state= initialState, action ={}) {
  console.log(action.type);
  switch (action.type) {
    case 'CREATE_USER':
      var newUser = {
        recording: action.recordedBlob,
        hash: action.hash,
      };
      return {
        ...state,
        users: [...state.users, newUser],
      };

    default:
      return {
        ...state,
      };

  }

}


export default userReducer;

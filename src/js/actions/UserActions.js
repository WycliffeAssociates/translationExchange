export function createUser(recordedBlob, generatedHash) {

  return (dispatch) => {
    

    dispatch({
      type: 'CREATE_USER',
      recordedBlob: recordedBlob,
      hash: generatedHash,

    });

  };

}

/* global expect describe it */
import reducer from '../../../js/reducers/UserReducer';

describe('UserReducer', () => {

  it('should return the initial state', ()=> {
    expect(reducer(undefined, {})).toEqual({
      users: [],
      loading: false,
      userCreated: false,
      audioName: '',
      hash: '',
      loggedInUser: null,
      socialLogin: false,
      tempUserId: null,
    });
  });

  it('should handle FETCHING_USERS', ()=> {
    expect(reducer([], {
      type: 'FETCHING_USERS',
    })).toEqual({
      loading: true,
    });
  });


  it('should handle FETCHED_USERS', ()=> {
    expect(reducer([], {
      type: 'FETCHED_USERS',
      users: ['user1', 'user2'],
    })).toEqual({
      loading: false,
      users: ['user1', 'user2'],
    });
  });


  it('should handle LOADING_USER', ()=> {
    expect(reducer([], {
      type: 'LOADING_USER',
    })).toEqual({
      loading: true,
    });
  });

  it('should handle SOCIAL_USER_CREATION', () => {
    expect(reducer([], {
      type: 'SOCIAL_USER_CREATION',
      socialLogin: true,
      tempUserId: 1234567,
    })).toEqual({
      socialLogin: true,
      tempUserId: 1234567,
    });

  });

  it('should handle USER_CREATED', () => {
    expect(reducer([], {
      type: 'USER_CREATED',
      nameAudio: 'name audio',
      hash: 1234567890,
    })).toEqual({
      audioName: 'name audio',
      hash: 1234567890,
      userCreated: true,
      socialLogin: false,
    });
  });

  it('should handle PATCHED_USER', () => {
    expect(reducer([], {
      type: 'PATCHED_USER',
      name_audio: 'name audio',
      hash: 1234567890,
    })).toEqual({
      audioName: 'name audio',
      hash: 1234567890,
      tempUserId: null,
      socialLogin: false,
    });
  });

  it('should handle LOGIN_SOCIAL_USER', () => {
    expect(reducer([], {
      type: 'LOGIN_SOCIAL_USER',
      name_audio: 'name audio',
      icon_hash: 1234567890,
    })).toEqual({
      audioName: 'name audio',
      hash: 1234567890,
    });
  });

  it('should handle RESET_USER_CREATED', () => {
    expect(reducer([], {
      type: 'RESET_USER_CREATED',
    })).toEqual({
      userCreated: false,
    });
  });

  it('should handle LOGIN_SUCCESS', () => {
    expect(reducer([], {
      type: 'LOGIN_SUCCESS',
      iconHash: 1234567890,
    })).toEqual({
      loggedInUser: 1234567890,
    });
  });

  it('should handle GET_LOGGED_USER_HASH', () => {
    expect(reducer([], {
      type: 'GET_LOGGED_USER_HASH',
      iconHash: 1234567890,
    })).toEqual({
      loggedInUser: 1234567890,
    });
  });


  it('should handle REMOVE_USER', () => {
    expect(reducer([], {
      type: 'REMOVE_USER',
    })).toEqual({
      users: [],
      loading: false,
      userCreated: false,
      audioName: '',
      hash: '',
      loggedInUser: null,
      socialLogin: false,
      tempUserId: null,
    });
  });

});

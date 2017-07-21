import localforage from 'localforage';
import firebase from '../../firebase_config';
import { database } from '../../firebase_config';

import {
  AUTH_USER,
  UNAUTH_USER,
  RECEIVE_USER_REPS,
} from '../consts';

import {
  toggleIsFetching,
} from '../is_fetching/action.is_fetching';

import {
  receiveErrorMessage,
} from '../error_message/action.error_message';

export const authUser = user => {
  return dispatch => {
    dispatch({
      type: RECEIVE_USER_REPS,
      payload: user.federalReps
    });
    
    dispatch({
      type: 'VERIFY_USER_DISTRICT_INF0',
      payload: user.address.fields.congressional_district
    });
    return dispatch({
      type: AUTH_USER,
      payload: user,
    });
  };
};

export const unauthUser = () => {
  localforage.removeItem('user');
  if (window.location.pathname === '/profile') {
    window.location.replace('/');
  }
  return {
    type: UNAUTH_USER,
    payload: null
  };
};

export const getAuthUpdate = () => {
  return dispatch => {
    dispatch(toggleIsFetching());
    return localforage.getItem('user')
      .then(user => {
        checkWindowPath(user);
        if (user !== null) {
          dispatch(authUser(user));
          return dispatch(toggleIsFetching());
        }
        return dispatch(toggleIsFetching());
      })
      .catch(err => dispatch(receiveErrorMessage(err.message)));
  };
};

export const createUser = (user, address, federalReps) => {
  return dispatch => {
    dispatch(toggleIsFetching());
    const newUser = Object.assign({}, user, {
      address,
      federalReps
    });
    return saveUser(newUser, dispatch);
  };
};

export const authorizeNewUserWithProvider = (method) => {
  return dispatch => {
    let provider;
    dispatch(toggleIsFetching());
    switch(method) {
    case 'google':
      provider = new firebase.auth.GoogleAuthProvider();
      break;
    default:
      console.log('got this UNEXPECTED method in switch [default]', method);
      return dispatch(toggleIsFetching());
    }
    provider.addScope('profile');
    provider.addScope('email');

    return firebase.auth().signInWithRedirect(provider)
      .then(user => {
        return user;
      })
      .catch(err => {
        dispatch(receiveErrorMessage(err.message));
        return dispatch(toggleIsFetching());
      });
  };
};

export const signInWithEmailAndPassword = (email, password) => {
  return dispatch => { 
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => {
      return database.ref(`/users/${user.uid}`).once('value').then(function(snap) {
        user = snap.val();
        localforage.setItem('user', user);
        dispatch(authUser(user));
        dispatch({
          type: RECEIVE_USER_REPS,
          payload: user.federalReps 
        });
        checkWindowPath(user);
      }); 
    })
    .catch(function(error) {

      dispatch(receiveErrorMessage(error.message));
      return dispatch(toggleIsFetching());
    });
  };
};

export const setUser = (user) => {
  return dispatch => {
    return database.ref(`/users/${user.uid}`).once('value').then(function(snap) {
      return saveUser(snap.val(), dispatch);
    })
    .catch(err => {
      return dispatch(receiveErrorMessage(err.message));
    });
  };
};

function saveUser(user, dispatch) {

  const newUser = {
    address: user.address,
    name: user.displayName || user.name,
    email: user.email,
    federalReps: user.federalReps,
    uid: user.uid,
    // photoUrl: user.photoUrl,
    refreshToken: user.refreshToken,
  };

  localforage.setItem('user', newUser)
    .then(userResult => {

      dispatch(authUser(userResult));
      dispatch({
        type: RECEIVE_USER_REPS,
        payload: userResult.federalReps 
      });
      checkWindowPath(userResult);
      dispatch(toggleIsFetching());
      return database.ref(`/users/${newUser.uid}`)
        .set(userResult)
        .catch(err => Promise.reject(err));
    })
    .catch(error => {

      dispatch(receiveErrorMessage(error.message));
      return dispatch(toggleIsFetching());
    });
}


function checkWindowPath(user) {

  if ((user !== null && window.location.pathname === '/signin') || ( user !== null && window.location.pathname === '/signup')) {
    window.location.replace('/profile');
  }
  if (!user && window.location.pathname === '/profile') {
    window.location.replace('/signin');
  }
}

import localforage from 'localforage';
import firebase from '../../firebase_config';
import { database } from '../../firebase_config';

import {
  AUTH_USER,
  UNAUTH_USER,
  RECEIVE_USER_REPS,
  API_BASE,
} from '../consts';
import {
  toggleIsFetching,
} from '../is_fetching/action.is_fetching';

import {
  receiveErrorMessage,
} from '../error_message/action.error_message';

export const authUser = user => {
  return dispatch => {
    dispatch({type: RECEIVE_USER_REPS, payload: user.federalReps });
    dispatch({type: 'VERIFY_USER_DISTRICT_INF0', payload: user.address.fields.congressional_district })
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
        if (user !== null) {
          dispatch(authUser(user));
          checkWindowPath(user);
          return dispatch(toggleIsFetching());
        }
        return dispatch(toggleIsFetching());
      })
      .catch(err => console.log('[LOCALFORAGE] most likely the cause', err));
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
      dispatch(toggleIsFetching());
      return null;
    }
    provider.addScope('profile');
    provider.addScope('email');

    return firebase.auth().signInWithRedirect(provider)
      .then(user => {
        return user;
      })
      .catch(err => {
        console.log('err', err);
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
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      console.log(errorCode, 'error signing in with email', errorMessage);
    });
  };
};

export const setUser = (user) => {
  return dispatch => {
    return database.ref(`/users/${user.uid}`).once('value').then(function(snap) {
      return saveUser(snap.val(), dispatch);
    })
    .catch(err => console.log('GOTTA HANDLE THE SET USER ERROR', err));
  };
};

function saveUser(user, dispatch) {
  console.log('INSIDE SAVE USER', user);
  const newUser = {
    address: user.address,
    name: user.displayName || user.name,
    email: user.email,
    federalReps: user.federalReps,
    uid: user.uid,
    // photoUrl: user.photoUrl,
    refreshToken: user.refreshToken,
  };
  console.log('USER TO BE SAVED', newUser);
  localforage.setItem('user', newUser)
    .then(userResult => {
      console.log('user result', userResult);
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
      console.log('[LOCAL FORAGE] save user error', error.message);
      return dispatch(toggleIsFetching());
    });
}


function checkWindowPath(user) {
  console.log('window PAATH', user, window.location.pathname);
  if ((user !== null && window.location.pathname === '/signin') || ( user !== null && window.location.pathname === '/signup')) {
    window.location.replace('/profile');
  }
  if (!user && window.location.pathname === '/profile') {
    window.location.replace('/signin');
  }
}

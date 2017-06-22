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

export const authUser = user => ({
  type: AUTH_USER,
  payload: user
});

export const unauthUser = () => {
  console.log('ABOUT TO UNAUTH USER', localforage.getItem('user'));
  localforage.removeItem('user');
  console.log('DElETED USER', localforage.getItem('user'));
  if (window.location.pathname === '/profile') {
    window.location.replace('/');
  }
  return {
    type: UNAUTH_USER,
    payload: null
  };
};

export const getAuthUpdate = () => {
  console.log('GETTING AUTH UPDATE');
  return dispatch => {
    dispatch(toggleIsFetching());
    return localforage.getItem('user')
      .then(user => {
        console.log('THE USER CAUSING ALL OF THE TROUBLE', user);
        if (user !== null) {
          console.log('USER DOES NOT EQUAL NULL IN GET AUTH UPDATE WHERE THE RECURSIVE SPOT', user);
          checkWindowPath(user);
          dispatch(toggleIsFetching());
          return dispatch(authUser(user));
        } else {
          console.log('would it not be fucked if we got here??????????????????', user);
          return firebase.auth().getRedirectResult()
          .then(result => {
            if (!result.user) {
              return dispatch(toggleIsFetching());
            }
            return saveUser(result.user, dispatch);
          });
        }
      })
      .catch(err => console.log('[LOCALFORAGE] most likely the cause', err));
  };
};

export const createUserWithEmailAndPassword = (email, password, userName, address, federalReps) => {
  return dispatch => {
    dispatch(toggleIsFetching());

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => {
        console.log('inside createUserWithEmailAndPassword .then!', user);
        user.userName = userName;
        user.address = address;
        user.federalReps = federalReps;
        return saveUser(user, dispatch);
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log('error with email', errorCode, errorMessage);
        dispatch(receiveErrorMessage(errorMessage));
        return dispatch(toggleIsFetching());
        // ...
      });
  };
};

export const authorizeNewUserWithProvider = (method, address) => {
  console.log('calling auth user', method);
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
      .catch(err => {
        console.log('err', err);
      });
  };
};

export const signInWithEmailAndPassword = (email, password) => {
  return dispatch => { 
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => {
      console.log('I SEE THE REPS INTHE DATABASE............ -_-', user);
      return saveUser(user, dispatch);
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      console.log('error signing in with email', errorMessage);
    });
  };
};

function saveUser(user, dispatch) {
  const newUser = {
    id: user.uid || user.id,
    refreshToken: user.refreshToken,
    name: user.displayName || 'anonymous',
    userPhoto: user.photoURL || 'http://fillmurray.com/g/200/200',
    provider: user.providerData.providerId || 'email',
    address: user.address,
    email: user.email || 'no email given',
    federalReps: user.federalReps,
  };

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
      return database.ref(`/users/${user.uid}`)
        .set(newUser)
        .catch(err => Promise.reject(err));
    })
    .catch(error => {
      console.log('[LOCAL FORAGE] save user error', error.message);
      // return Promise.reject(error);
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

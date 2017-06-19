import localforage from 'localforage';
import firebase from '../../firebase_config';
import { database } from '../../firebase_config';

import {
  AUTH_USER,
  UNAUTH_USER,
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

export const unauthUser = (id) => {
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
        if (!user) {
          return firebase.auth().getRedirectResult()
          .then(result => {
            if (!result.user) {
              return null;
            }
            saveUser(result.user, dispatch);
            return user;
          });
        } else {
          dispatch(authUser(user));
          return user;
        }
      })
      .then(user => {
        checkWindowPath(user);
        dispatch(toggleIsFetching());
      })
      .catch(err => console.log('[LOCALFORAGE] most likely the cause', err));
  };
};

export const createUserWithEmailAndPassword = (email, password, addr) => {
  return dispatch => {
    dispatch(toggleIsFetching());
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => {
        user.address = addr;
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

export const authorizeNewUserWithProvider = (method, addr) => {
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
      .then(function(result) {

        // This gives you a Google Access Token.
        const token = result.credential.accessToken;
        console.log('[NEVER SHOWN] token', token);
        // The signed-in user info.
        const user = result.user;
        user.address = addr;
        return saveUser(user, dispatch, 'google');
        // console.log('[NEVER SHOWN] user', user);
        // return dispatch(authUser(user));
      })
      .catch(err => {
        console.log('err', err);
      });
  };
};

export const signInWithEmailAndPassword = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
  .then(user => {
    saveUser(user);
    return user;
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    console.log('error sigingin in with meila', errorMessage);
  });
};


function saveUser(user, dispatch, provider) {
  const newUser = {
    id: user.uid || user.id,
    refreshToken: user.refreshToken,
    name: user.displayName || 'anonymous',
    userPhoto: user.photoURL || 'http://fillmurray.com/g/200/200',
    provider: provider || 'email',
    address: user.address,
    email: user.email || 'no email given',
  };

  localforage.setItem('user', newUser)
    .then(userResult => {
      database.ref(`/users/${user.uid}`)
        .set(newUser);
      dispatch(toggleIsFetching());
      dispatch(authUser(userResult));
      checkWindowPath(userResult);
      return userResult;
    })
    .catch(error => {
      console.log('[LOCAL FORAGE] save user error', error.message);
      // return Promise.reject(error);
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

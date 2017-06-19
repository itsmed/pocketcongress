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
    console.log('updating');
    return localforage.getItem('user')
      .then(user => {
        if (!user) {
          return firebase.auth().getRedirectResult()
          .then(result => {
            console.log('[in getAuthUpdate] got redirect result', result);
            if (!result.user) {
              console.log('[in getAuthUpdate] no user from firebase redirect result', result);
              dispatch(toggleIsFetching());
              return null;
            }
            saveUser(result.user, dispatch);
            return user;
          });
        } else {
          console.log('user', user);
          saveUser(user, dispatch);
          // dispatch(toggleIsFetching());
          // dispatch(authUser(user));
          return user;
        }
      })
      .then((user) => {
        console.log('user', user);
        // dispatch(toggleIsFetching()); 
        if (user && window.location.pathname === '/signin') {
          window.location.replace('/profile');
        }
        if (!user && window.location.pathname === '/profile') {
          window.location.replace('/signin');
        }
      })
      .catch(err => console.log('[LOCALFORAGE] most likely the cause', err));
  };
};



export const createUserWithEmailAndPassword = (email, password) => {
  return dispatch => {
    dispatch(toggleIsFetching());
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => {
        console.log('user from email', user);
        return saveUser(user, dispatch);
        // dispatch(toggleIsFetching());
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

export const authorizeNewUserWithProvider = method => {
  console.log('calling auth user', method);
  return dispatch => {
    let provider;
    dispatch(toggleIsFetching());
    switch(method) {
    case 'google':
      console.log('got this method in switch [google]', method);
      provider = new firebase.auth.GoogleAuthProvider();
      break;
    default:
      console.log('got this UNEXPECTED method in switch [default]', method);
      dispatch(toggleIsFetching());
      return null;
    }
    provider.addScope('profile');
    provider.addScope('email');
    console.log('provider', provider);
    return firebase.auth().signInWithRedirect(provider)
      .then(function(result) {

        // This gives you a Google Access Token.
        const token = result.credential.accessToken;
        console.log('[NEVER SHOWN] token', token);
        // The signed-in user info.
        const user = result.user;
        return saveUser(user, dispatch);
        // console.log('[NEVER SHOWN] user', user);
        // return dispatch(authUser(user));
      })
      .catch(err => {
        console.log('err', err);
      });
  };
};


function saveUser(user, dispatch) {
  localforage.setItem('user', {
    id: user.uid,
    accessToken: user.credential.accessToken,
    name: user.displayName,
    userPhoto: user.photoURL,
  }).then(user => {
    console.log('[LOCAL FORAGE] saved user', user);
    database.ref(`/users/${user.uid}`)
      .set({
        provider: user.credential.providerId,
        name: user.displayName,
        email: user.email,
        pictureUrl: user.photoURL
      });
    dispatch(toggleIsFetching());
    dispatch(authUser(user));
    return user;
  })
  .catch(error => {
    console.log('[LOCAL FORAGE] save user error', error);
    return Promise.reject(error);
  });
}

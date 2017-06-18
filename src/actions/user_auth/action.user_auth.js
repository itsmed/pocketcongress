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

export const authUser = user => ({
  type: AUTH_USER,
  payload: user
});

export const unauthUser = (id) => {
  localforage.removeItem('user');
  return {
    type: UNAUTH_USER,
    payload: null
  };
};

export const getAuthUpdate = () => {
  return dispatch => {
    console.log('updating');
    localforage.getItem('user')
    .then(user => {
      if (!user) {
        firebase.auth().getRedirectResult()
          .then(result => {
            console.log('[in getAuthUpdate] got redirect result', result);
            if (!result.user) {
              console.log('[in getAuthUpdate] no user from firebase redirect result', result);
              return;
            }
            localforage.setItem('user', {
              id: result.user.uid,
              accessToken: result.credential.accessToken,
              name: result.user.displayName,
              userPhoto: result.user.photoURL,
            }).then(user => {
              console.log('[LOCAL FORAGE] saved user', user);
              dispatch(authUser(user));
            })
            .catch(error => {
              console.log('[LOCAL FORAGE] save user error', error);
              return Promise.reject(error);
            });
            database.ref(`/users/${result.user.uid}`)
              .set({
                provider: result.credential.providerId,
                name: result.user.displayName,
                email: result.user.email,
                pictureUrl: result.user.photoURL
              });
          })
          .catch(err => console.log('[in getAuthUpdate] maybe no redirect?', err));
      } else {
        console.log('user', user);
        return dispatch(authUser(user));
      }
    })
    .catch(err => console.log('[LOCALFORAGE] most likely the cause', err));
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
      console.log('got this method in switch [default]', method);
      dispatch(toggleIsFetching());
      return;
    }
    provider.addScope('profile');
    provider.addScope('email');
    console.log('provider', provider);
    firebase.auth().signInWithRedirect(provider)
    .then(function(result) {

      // This gives you a Google Access Token.
      const token = result.credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log('[NEVER SHOWN] token', token);
      console.log('[NEVER SHOWN] user', user);
      return dispatch(authUser(user));
    })
    .catch(err => console.log('err', err));
  };
};

import history from '../history'
import {
    SIGN_IN_SUCCESS,
    SIGN_IN_FAILURE,
    SIGNOUT_SUCCESS,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
} from './types'

export const signIn = (user) => {
    return (dispatch, getState, getFirebase) => {
        const firebase = getFirebase();
        firebase
            .auth()
            .signInWithEmailAndPassword(
                user.email,
                user.password
            ).then(() => {
            dispatch({ type: SIGN_IN_SUCCESS });
        }).catch((err) => {
            dispatch({ type: SIGN_IN_FAILURE, err });
        });

    }

};

export const signOut = () => {
    return (dispatch, getState, getFirebase) => {
        const firebase = getFirebase();
        firebase.auth().signOut().then(() => {
            dispatch({ type: SIGNOUT_SUCCESS })
        });
        history.push('/')
    }
};

export const signUp = (newUser) => {
    return (dispatch, getState, getFirebase) => {
        const firebase = getFirebase();
        const db = firebase.firestore()
        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then(resp => {
            return db.collection('users').doc(resp.user.uid).set({
                firstName: newUser.firstName,
                lastName: newUser.lastName
            });
        }).then(() => {
            dispatch({ type: SIGNUP_SUCCESS });
        }).catch((err) => {
            dispatch({ type: SIGNUP_FAILURE, err});
        });
    }
}


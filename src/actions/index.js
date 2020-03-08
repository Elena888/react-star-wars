import history from '../history'
import {
    SIGN_IN_SUCCESS,
    SIGN_IN_FAILURE,
    SIGNOUT_SUCCESS,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
    FETCH_SUCCESS,
    FETCH_FAILURE,
    FETCH_REQUEST,
    FETCH_FAILURE_HOMEWORLD,
    FETCH_SUCCESS_HOMEWORLD,
    FETCH_REQUEST_HOMEWORLD,
    FETCH_FAILURE_FILMS,
    FETCH_REQUEST_FILMS,
    FETCH_SUCCESS_FILMS,
    ADD_TO_FAVORITES,
    ADD_TO_FAVORITES_ERROR,
    REMOVE_FROM_FAVORITES_SUCCESS,
    REMOVE_FROM_FAVORITES_ERROR,
} from './types'

export const signIn = (user) => {
    return (dispatch, getState, getFirebase) => {
        const firebase = getFirebase();
        firebase
            .auth()
            .signInWithEmailAndPassword(
                user.email,
                user.password
            ).then((res) => {
            console.log('res',res)
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

export const requestError = (type, error) => ({
    type: type,
    error
});

export const fetchSuccess = (type, data) => {
    return {
        type: type,
        payload: data
    }
};

export const requestData = (type) => ({
    type: type,
});

/**
 * Fetch people, fetch hero details action
 */
export const fetchData = (apiUrl) => {
    return (dispatch) => {
        dispatch(requestData(FETCH_REQUEST));

        return fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                dispatch(fetchSuccess(FETCH_SUCCESS, data));
                return data;
            })
            .catch(error => dispatch(requestError(FETCH_FAILURE, error)))
    }
}

/**
 * Fetch homeworld data action
 */
export const fetchDataHomeWorld = (apiUrl) => {
    return (dispatch) => {
        dispatch(requestData(FETCH_REQUEST_HOMEWORLD));

        return fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                dispatch(fetchSuccess(FETCH_SUCCESS_HOMEWORLD, data));
                return data;
            })
            .catch(error => dispatch(requestError(FETCH_FAILURE_HOMEWORLD, error)))
    }
}

/**
 * Fetch films data action
 */
export const fetchDataFilms = (arrFilmsUrl) => {
    return (dispatch) => {
        const arr = []
        arrFilmsUrl.map(apiUrl => {
            dispatch(requestData(FETCH_REQUEST_FILMS));
            return fetch(apiUrl)
                .then(res => res.json())
                .then(data => {
                    arr.push(data)
                    return data;
                })
                .catch(error => dispatch(requestError(FETCH_FAILURE_FILMS, error)))
        })
        dispatch(fetchSuccess(FETCH_SUCCESS_FILMS, arr))
    }
}

/**
 * Add to favorites action
 */
export const addFavorites = (item) => {
    return (dispatch, getState, getFirebase) => {
        const firebase = getFirebase();
        const db = firebase.firestore()

        const userId = getState().firebase.auth.uid;
        db.collection('favorites').doc(userId + item.id).set({
            name: item.name,
            id: item.id,
            gender: item.gender,
            userId,
        }).then(() => {
            dispatch({ type: ADD_TO_FAVORITES });
        }).catch(err => {
            dispatch({ type: ADD_TO_FAVORITES_ERROR }, err);
        });
    }
}

export const removeFavorites = (itemId) => {
    return (dispatch, getState, getFirebase) => {
        const firebase = getFirebase();
        const db = firebase.firestore()

        const userId = getState().firebase.auth.uid;
        db.collection('favorites').doc(userId + itemId).delete().then(function() {
            console.log("Document successfully deleted!");
            dispatch({
                type: REMOVE_FROM_FAVORITES_SUCCESS,
            })
        }).catch(function(error) {
            console.error("Error removing document: ", error);
            dispatch({
                type: REMOVE_FROM_FAVORITES_ERROR
            })
        });

    }
}


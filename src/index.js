import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux'
import reduxThunk from 'redux-thunk'
import { getFirebase,ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import App from './App'
import reducers from './reducers'
import firebase from './config/fbConfig'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [
    reduxThunk.withExtraArgument(getFirebase)
  ]
  const store = createStore(
    reducers,
    {},
    composeEnhancers(
      applyMiddleware(...middlewares),
    )
  );



ReactDOM.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider
            firebase={firebase}
            config={firebase}
            dispatch={store.dispatch}
            createFirestoreInstance={createFirestoreInstance}
            >
            <App/>
        </ReactReduxFirebaseProvider>
    </Provider>,
    document.querySelector('#root')
);

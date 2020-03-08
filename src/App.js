import React from 'react'
import {Route, Switch, Router, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import { isLoaded } from 'react-redux-firebase'
import Header from './components/Header'
import FavoriteList from './pages/FavoriteList'
import PeopleList from './pages/PeopleList'
import HeroDetails from './pages/HeroDetails'
import SignIn from './pages/Auth/SignIn'
import SignUp from './pages/Auth/SignUp'
import history from './history'
import './App.scss';

const App = ({auth}) => {

    if (!isLoaded(auth)) return <div>Loading...</div>;

    let routes = (
        <Switch>
            <Route path="/" exact component={PeopleList}/>
            <Route path="/hero/:id" exact component={HeroDetails}/>
            <Route path="/sign-in" exact component={SignIn}/>
            <Route path="/sign-up" exact component={SignUp}/>
            <Redirect to="/"/>
        </Switch>
    )
    if(isLoaded(auth) && auth.uid){
        routes = (
            <Switch>
                <Route path="/" exact component={PeopleList}/>
                <Route path="/favorites-list" exact component={FavoriteList}/>
                <Route path="/hero/:id" exact component={HeroDetails}/>
                <Redirect to="/"/>
            </Switch>
        )
    }

    return (
        <>
            <Router history={history}>
                <Header/>
                {routes}
            </Router>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
};
export default connect(mapStateToProps)(App)
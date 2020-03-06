import React from 'react'
import {Route, Switch, BrowserRouter, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Header from './components/Header'
import FavoriteList from './pages/FavoriteList'
import PeopleList from './pages/PeopleList'
import HeroDetails from './pages/HeroDetails'
import SignIn from './pages/Auth/SignIn'
import SignUp from './pages/Auth/SignUp'
import './App.scss';

const App = ({isSignIn}) => {
  let routes = (
    <Switch>
        <Route path="/people-list" exact component={PeopleList}/>
        <Route path="/people-list/:id" exact component={HeroDetails}/>
        <Route path="/sign-in" exact component={SignIn}/>
        <Route path="/sign-up" exact component={SignUp}/>
        <Redirect to="/people-list"/>
    </Switch>
  )
  if(isSignIn){
    routes = (
        <Switch>
            <Route path="/" exact component={FavoriteList}/>
            <Route path="/people-list" exact component={PeopleList}/>
            <Route path="/people-list/:id" exact component={HeroDetails}/>
            <Redirect to="/"/>
        </Switch>
    )
}

  return (
    <>
        <BrowserRouter>
            <Header/>
           {routes}
        </BrowserRouter>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
      isSignIn: state.auth.isSignedIn
  }
};
export default connect(mapStateToProps)(App)
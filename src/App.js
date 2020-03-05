import React from 'react'
import {Route, Switch, BrowserRouter} from 'react-router-dom'
import Header from './components/Header'
import FavoriteList from './pages/FavoriteList'
import PeopleList from './pages/PeopleList'
import HeroDetails from './pages/HeroDetails'
import './App.scss';

function App() {
  return (
    <>
        <BrowserRouter>
            <Header/>
            <Switch>
                <Route path="/" exact component={FavoriteList}/>
                <Route path="/people-list" exact component={PeopleList}/>
                <Route path="/people-list/:id" exact component={HeroDetails}/>
            </Switch>
        </BrowserRouter>
    </>
  );
}

export default App;

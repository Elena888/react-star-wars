import React from 'react'
import {NavLink} from 'react-router-dom'
import logo from '../images/Star_Wars_logo.svg'

const Header = () => {
    return(
        <header>
            <div className="ui borderless inverted menu">
                <div className="ui container">
                    <NavLink className="item logo-link" exact to="/">
                        <img src={logo} className='logo' alt='logo' />
                    </NavLink>

                    <div className="right menu">
                        <NavLink exact to="/" className="item">Favorite List</NavLink>
                        <NavLink exact to="/people-list" className="item">People List</NavLink>
                    </div>
                </div>
            </div>
        </header>

    )
};

export default Header;

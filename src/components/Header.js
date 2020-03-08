import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../actions'
import logo from '../images/Star_Wars_logo.svg'

const Header = ({auth, signOut}) => {
    
    return(
        <header>
            <div className="ui borderless inverted menu">
                <div className="ui container">
                    <NavLink className="item logo-link" exact to="/">
                        <img src={logo} className='logo' alt='logo' />
                    </NavLink>

                    <div className="right menu">

                        <NavLink exact to="/" className="item">People List</NavLink>
                        {
                            auth.uid ?
                            <>
                                <NavLink exact to="/favorites-list" className="item">Favorite List</NavLink>
                                <div className="item">
                                    <button className="ui inverted button" onClick={signOut}>Log Out</button>
                                </div>
                            </>
                            :
                            <>
                                <div className="item">
                                    <NavLink exact to="/sign-up" className="ui inverted yellow button">Sign Up</NavLink>
                                </div>
                                <div className="item">
                                    <NavLink exact to="/sign-in" className="ui inverted button">Sign In</NavLink>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </header>

    )
};

const mapStateToProps = (state) => {
    return{
      auth: state.firebase.auth
    }
  };
  

export default connect(mapStateToProps, {signOut})(Header);

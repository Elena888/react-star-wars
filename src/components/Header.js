import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../actions'
import logo from '../images/Star_Wars_logo.svg'

import '../styles/components/Header.scss'

const Header = ({auth, signOut}) => {
    return(
        <header>
            <div className="ui borderless inverted menu">
                <div className="ui container header-menu">
                    
                    <NavLink className="item logo-link" exact to="/">
                        <img src={logo} className='logo' alt='logo' />
                    </NavLink>

                    <div className="right menu">
                        <NavLink exact to="/" className="item">People List</NavLink>
                        {
                            auth.uid ?
                            <>
                                <NavLink exact to="/favorites-list" className="item">Favorite List</NavLink>
                                <button className="ui inverted button" onClick={signOut}>Log Out</button>
                                
                            </>
                            :
                            <>
                                <NavLink exact to="/sign-up">
                                    <button className="ui inverted yellow button">Sign Up</button>
                                </NavLink>
                                <NavLink exact to="/sign-in">
                                    <button className="ui inverted button">Sign In</button>
                                </NavLink>
                            </>
                        }
                        </div>
                    </div>
                </div>
        </header>
    )
};

Header.propTypes = {
    auth: PropTypes.object,
    signOut: PropTypes.func
};

const mapStateToProps = (state) => {
    return{
      auth: state.firebase.auth
    }
  };
  


export default connect(mapStateToProps, {signOut})(Header);

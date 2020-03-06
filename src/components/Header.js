import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../actions'
import logo from '../images/Star_Wars_logo.svg'

const Header = (props) => {
    const { firebase } = props;
    console.log('firebase', firebase)
    
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
                        {
                            firebase.auth.uid ? 
                            <button onClick={props.signOut}>Log Out</button>
                            :
                            <>
                                <NavLink exact to="/sign-up" className="ui primary button">Sign Up</NavLink>
                                <NavLink exact to="/sign-in" className="ui button">Sign In</NavLink>
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
      firebase: state.firebase
    }
  }
  

export default connect(mapStateToProps, {signOut})(Header);

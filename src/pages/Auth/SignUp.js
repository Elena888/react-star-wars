import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp } from '../../actions'
import '../../styles/pages/Auth.scss'

class SignUp extends Component {
    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signUp(this.state);
    }
    render() {
        const { auth, authError } = this.props;
        if (auth.uid) return <Redirect to='/' />
        return (
            <div className="section-form">
                <div className="ui text container">

                    <form className="ui form" onSubmit={this.handleSubmit}>
                        <h1>Sign Up</h1>
                        <div className="field">
                            <label htmlFor="email">Email</label>
                            <input type="email" id='email' onChange={this.handleChange} />
                        </div>
                        <div className="field">
                            <label htmlFor="password">Password</label>
                            <input type="password" id='password' onChange={this.handleChange} />
                        </div>
                        <div className="field">
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" id='firstName' onChange={this.handleChange} />
                        </div>
                        <div className="field">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" id='lastName' onChange={this.handleChange} />
                        </div>

                        <button className="ui button violet basic" type="submit">Sign Up</button>
                        { authError ? <p className="error-message">{authError}</p> : null }
                    </form>
                </div>
            </div>

        )
    }
}

SignUp.propTypes = {
    auth: PropTypes.object,
    authError: PropTypes.string
  };

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}


export default connect(mapStateToProps, {signUp})(SignUp)
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { signIn } from '../../actions'
import '../../styles/pages/Auth.scss'

class SignIn extends Component {
  state = {
    email: '',
    password: ''
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signIn(this.state)
  }
  render() {
    const { authError } = this.props;
    return (
        <div className="section-form">
          <div className="ui text container">

            <form className="ui form" onSubmit={this.handleSubmit}>
                <h1>Sign In</h1>
              <div className="field">
                <label>Email</label>
                <input type="email" id='email' onChange={this.handleChange} />
              </div>
              <div className="field">
                <label>Password</label>
                <input type="password" id='password' onChange={this.handleChange} />
              </div>

              <button className="ui button violet basic" type="submit">Login</button>
              { authError ? <p className="error-message">{authError}</p> : null }
            </form>
          </div>
        </div>
    )
  }
}

SignIn.propTypes = {
  authError: PropTypes.string
};

const mapStateToProps = (state) => {
  return{
    authError: state.auth.authError
  }
}


export default connect(mapStateToProps, {signIn})(SignIn)
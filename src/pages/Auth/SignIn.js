import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn } from '../../actions'

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
      <div className="ui text container">
        <form className="ui form" onSubmit={this.handleSubmit}>
          <div className="field">
            <label>Email</label>
            <input type="email" id='email' onChange={this.handleChange} />
          </div>
          <div className="field">
            <label>Password</label>
            <input type="password" id='password' onChange={this.handleChange} />
          </div>
          
          <button className="ui button" type="submit">Login</button>
          { authError ? <p>{authError}</p> : null }
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    authError: state.auth.authError
  }
}


export default connect(mapStateToProps, {signIn})(SignIn)
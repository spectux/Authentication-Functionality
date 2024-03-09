import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'

class Login extends Component {
  state = {
    username: '',
    password: '',
    isLoggedIn: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({ username: event.target.value })
  }

  onChangePassword = event => {
    this.setState({ password: event.target.value })
  }

  onSubmitSuccess = jwtToken => {
    const { history } = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 60,
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({ errorMsg })
  }

  submitForm = async event => {
    event.preventDefault()
    const { username, password } = this.state
    const userDetails = { username, password }
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const { username, password, isLoggedIn, errorMsg } = this.state
    if (isLoggedIn || Cookies.get('jwt_token')) {
      return <Redirect to="/" />
    }
    return (
      <div>
        <h1>Please Login</h1>
        <form onSubmit={this.submitForm}>
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={this.onChangePassword}
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <button onClick={this.onSubmitSuccess}>
          Login with Sample Creds
        </button>
        {errorMsg && <p>{errorMsg}</p>}
      </div>
    )
  }
}

export default Login


import React from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

const About = () => {
  const jwtToken = Cookies.get('jwt_token')

  if (!jwtToken) {
    return <Redirect to="/login" />
  }

  return (
    <div>
      <h1>About Route</h1>
    </div>
  )
}

export default About

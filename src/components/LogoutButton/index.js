import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

class LogoutButton extends Component {
  handleLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    return <button onClick={this.handleLogout}>Logout</button>
  }
}

export default withRouter(LogoutButton)

import React, {Component} from 'react';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
  // # the name attribute will match up the model fiels
class Login extends Component {
  handleSubmit = (e) => {
    e.preventDefault();

    let user = {
      username: 'admin',
      email: 'admin@example.com',
      password: 'safepass1'

    }
    axios.post('/api/v1/rest-auth/login/', user)
    .then(res => {
      console.log(res);
    })
    .catch(error => {
      console.log(error)
    });
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <button>Log in</button>
      </form>
    )
  }

}

export default Login;

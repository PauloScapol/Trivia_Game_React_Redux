import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginForm } from '../redux/actions/index';

class Login extends React.Component {
  state = {
    email: '',
    name: '',
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  render() {
    const { email, name } = this.state;
    return (
      <form
        onSubmit={ (e) => {
          const { dispatch } = this.props;
          e.preventDefault();
          console.log('entrou');
          dispatch(loginForm(name, email));
        } }
      >
        <label htmlFor="email">
          Email:
          <input
            type="email"
            name="email"
            id="email"
            data-testid="input-gravatar-email"
            onChange={ (e) => this.handleChange(e) }
          />
        </label>
        <label htmlFor="password">
          Nome:
          <input
            type="text"
            name="name"
            id="password"
            data-testid="input-player-name"
            onChange={ (e) => this.handleChange(e) }
          />
        </label>
        <button
          type="submit"
          disabled={ !(email.length && name.length > 0) }
          data-testid="btn-play"
        >
          Play
        </button>
      </form>
    );
  }
}
Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
export default connect(null, null)(Login);

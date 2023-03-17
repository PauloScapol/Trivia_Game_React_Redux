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
    const { history } = this.props;
    return (
      <form
        onSubmit={ async (e) => {
          e.preventDefault();
          const { dispatch } = this.props;
          const response = await fetch('https://opentdb.com/api_token.php?command=request');
          const data = await response.json();
          localStorage.setItem('token', data.token);
          dispatch(loginForm(name, email));
          history.push('/game');
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
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ () => history.push('/settings') }
        >
          Configurações
        </button>
      </form>
    );
  }
}
Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default connect(null, null)(Login);

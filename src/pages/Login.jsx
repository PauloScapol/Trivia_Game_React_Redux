import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginForm } from '../redux/actions/index';
// import '../styles/Login.css';

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
        // className="login-inputs-button"
        className="flex flex-col items-center
        rounded-lg shadow-lg bg-indigo-400 h-80
        justify-center mt-12 w-6/12 m-auto"
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
        <label className="label-email" htmlFor="email">
          Email:
          <input
            type="email"
            name="email"
            id="email"
            className="border-green-300 h-8 rounded-2xl
            mt-10 px-7 w-96 mb-3"
            data-testid="input-gravatar-email"
            onChange={ (e) => this.handleChange(e) }
          />
        </label>
        <label className="label-name" htmlFor="password">
          Nome:
          <input
            type="text"
            name="name"
            id="password"
            className="border-green-300 h-8 rounded-2xl
            mt-10 px-7 w-96 mb-3"
            data-testid="input-player-name"
            onChange={ (e) => this.handleChange(e) }
          />
        </label>
        <div className="flex">
          <button
            className="bg-green-400 border-none rounded-xl shadow-inner
            text-black flex text-lg h-10 justify-center mb-7 mr-7
            p-2 text-center w-48"
            type="submit"
            disabled={ !(email.length && name.length > 0) }
            data-testid="btn-play"
          >
            Play
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            className="bg-blue-800 border-none rounded-xl shadow-inner
            text-black flex text-lg h-10 justify-center mb-7 mr-7
            p-2 text-center w-48"
            onClick={ () => history.push('/settings') }
          >
            Configurações
          </button>
        </div>
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

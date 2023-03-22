import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  state = {
    hash: '',
  };

  componentDidMount() {
    const { email } = this.props;
    const emailHash = md5(email).toString();
    this.setState({ hash: emailHash });
  }

  render() {
    const { name, score } = this.props;
    const { hash } = this.state;
    console.log(name);
    return (
      <header className="h-32 flex bg-white z-20">
        <div className="w-2/3" />
        <div className="flex items-center w-1/3 justify-evenly">
          <div className="flex items-center gap-2">
            <img
              className="w-16 h-16 rounded-full border-2 border-gray-200"
              data-testid="header-profile-picture"
              src={ `https://www.gravatar.com/avatar/${hash}` }
              alt={ name }
            />
            <h2
              className="text-xl"
              data-testid="header-player-name"
            >
              {name}

            </h2>
          </div>
          <h2 data-testid="header-score" className="text-xl">
            <span>&#9733;</span>
            Pontos:
            {' '}
            {score}
          </h2>
        </div>
      </header>
    );
  }
}
const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});
Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};
export default connect(mapStateToProps)(Header);

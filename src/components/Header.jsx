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
    const { name } = this.props;
    const { hash } = this.state;
    console.log(name);
    return (
      <header>
        <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${hash}` } alt={ name } />
        <h2 data-testid="header-player-name">{name}</h2>
        <h2 data-testid="header-score">0</h2>
      </header>
    );
  }
}
const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
});
Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
export default connect(mapStateToProps)(Header);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setResetPlayer } from '../redux/actions';

class Ranking extends Component {
  state = {
    ranking: [],
  };

  componentDidMount() {
    const LS = localStorage.getItem('players')
      ? JSON.parse(localStorage.getItem('players')) : [];
    LS.sort((a, b) => b.score - a.score);
    this.setState({ ranking: LS });
  }

  render() {
    const { ranking } = this.state;
    const { history, dispatch } = this.props;
    return (
      <>
        <div data-testid="ranking-title">Ranking</div>
        {ranking?.map((player, index) => (
          <div key={ index }>
            <img src={ `https://www.gravatar.com/avatar/${player.picture}` } alt="player" />
            <h2 data-testid={ `player-name-${index}` }>{player.name}</h2>
            <h2 data-testid={ `player-score-${index}` }>{player.score}</h2>
          </div>
        ))}
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => {
            dispatch(setResetPlayer());
            history.push('/');
          } }
        >
          Go home
        </button>
      </>
    );
  }
}
Ranking.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default connect(null)(Ranking);

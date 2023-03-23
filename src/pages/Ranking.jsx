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
      <div className="h-screen py-10">
        <div
          className="
          w-1/2
          m-auto
          flex
          flex-col
          items-center
          rounded-3xl
          bg-white
          bg-opacity-50
          backdrop-blur-sm"
        >
          <div
            className="text-5xl text-green-900 font-bold py-10"
            data-testid="ranking-title"
          >
            Ranking
          </div>
          <div className="w-full flex flex-col content-between gap-5">
            {ranking?.map((player, index) => (
              <div
                className="
                  mx-10
                  border
                  border-black
                  rounded-full
                  flex
                  flex-row
                  items-center"
                key={ index }
              >
                <section className="text-2xl w-2/3 pr-5 gap-5 flex items-center">
                  <img className="rounded-full ml-5" src={ `https://www.gravatar.com/avatar/${player.picture}` } alt="player" />
                  <h2 data-testid={ `player-name-${index}` }>{player.name}</h2>
                </section>
                <h2
                  className="
                    border rounded-full bg-white bg-opacity-50
                    text-2xl font-semibold
                    w-1/3 py-6
                    flex justify-around"
                  data-testid={ `player-score-${index}` }
                >
                  🏅
                  {' '}
                  {player.score}
                  {' '}
                  Points
                </h2>
              </div>
            ))}
          </div>
          <button
            className="
              inline-block
              px-6 py-4
              cursor-pointer
              text-center text-white
              bg-green-600 hover:bg-green-800
              active:bg-green-800
              active:shadow-xl
              rounded-lg
              shadow-lg
              my-5"
            type="button"
            data-testid="btn-go-home"
            onClick={ () => {
              dispatch(setResetPlayer());
              history.push('/');
            } }
          >
            Go home
          </button>
        </div>
      </div>
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

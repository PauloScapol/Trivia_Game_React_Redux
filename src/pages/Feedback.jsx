import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import Header from '../components/Header';
import { setResetPlayer } from '../redux/actions';

class Feedback extends React.Component {
  componentDidMount() {
    const { score, name, email, history } = this.props;
    const LS = localStorage.getItem('players')
      ? JSON.parse(localStorage.getItem('players')) : [];
    if (name !== '' && email !== '') {
      const newPlayer = {
        name,
        score,
        picture: md5(email).toString(),
      };
      localStorage.setItem('players', JSON.stringify([...LS, newPlayer]));
    } else {
      history.push('/');
    }
  }

  handleClick = () => {
    const { history, dispatch } = this.props;
    dispatch(setResetPlayer());
    history.push('/');
  };

  render() {
    const minAssertions = 3;
    const { score, assertions, history } = this.props;
    return (

      <div className="text-center flex-col w-80 m-auto py-10 rounded-t-sm">
        <div className="bg-white rounded-md">
          <Header />
          {/* <h1
            className="p-1 text-green-500 text-3xl font-bold"
            data-testid="feedback-text"
          >
            {assertions < minAssertions ? 'Could be better...' : 'Well Done!'}
          </h1> */}
          {
            assertions < minAssertions ? (
              <h1
                className="p-1 text-red-500 text-3xl font-bold"
                data-testid="feedback-text"
              >
                Could be better...
              </h1>
            ) : (
              <h1
                className="p-1 text-green-500 text-3xl font-bold"
                data-testid="feedback-text"
              >
                Well Done!
              </h1>)
          }

          <p className="p-1 text-gray-400" data-testid="feedback-total-question">
            {`Você acertou ${assertions} questões!`}
          </p>
          <p className="p-1 text-gray-400" data-testid="feedback-total-score">
            {`Um total de ${score} pontos!`}
          </p>

        </div>

        <div className="w-80">
          <button
            className="px-10 py-1 my-1 mr-3 bg-blue-300 rounded-sm text-white
            font-semibold"
            type="button"
            data-testid="btn-ranking"
            onClick={ () => history.push('/ranking') }
          >
            Ranking
          </button>

          <button
            className="px-10 py-1 my-1  bg-green-400 rounded-sm text-white font-semibold
            "
            type="button"
            data-testid="btn-play-again"
            onClick={ this.handleClick }
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  name: state.player.name,
  email: state.player.gravatarEmail,
});
Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};
export default connect(mapStateToProps)(Feedback);

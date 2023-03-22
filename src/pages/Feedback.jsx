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
      <>
        <Header />
        <div>
          <h1 data-testid="feedback-text">Feedback</h1>
          <h1 data-testid="feedback-total-score">{score}</h1>
          <h1 data-testid="feedback-total-question">{assertions}</h1>
          <h1 data-testid="feedback-text">
            {assertions < minAssertions ? 'Could be better...' : 'Well Done!'}
          </h1>
        </div>
        <div>
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ () => history.push('/ranking') }
          >
            Ranking
          </button>

          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ this.handleClick }
          >
            Play Again
          </button>
        </div>
      </>
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

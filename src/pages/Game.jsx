import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { setScore, setAcertos } from '../redux/actions';
import '../styles/game.css';

class Game extends React.Component {
  state = {
    returnTrivia: [],
    alternatives: [],
    count: 0,
    showColors: false,
    time: 30,
    isRunning: true,
    timeOutID: null,
    disabled: false,
    isShowing: false,
  };

  componentDidMount() {
    const { difficulty, type, category } = this.props;
    this.startTimer();
    const token = localStorage.getItem('token');
    const URL = `https://opentdb.com/api.php?amount=5${category || ''}${difficulty || ''}${type || ''}&token=${token}`;
    fetch(URL)
      .then((res) => res.json())
      .then((json) => {
        if (json.response_code === 0) {
          const numShuffle = 0.5;
          const alternatives = [
            ...json.results[0].incorrect_answers,
            json.results[0].correct_answer,
          ];
          const shuffleAlternatives = alternatives.sort(
            () => Math.random() - numShuffle,
          );
          this.setState({
            returnTrivia: json,
            alternatives: shuffleAlternatives,
          });
        } else {
          this.setState({ returnTrivia: json });
        }
      });
  }

  componentDidUpdate(prevState) {
    const lintChato = 3;
    const { history } = this.props;
    const { returnTrivia } = this.state;
    if (
      prevState.returnTrivia !== returnTrivia
      && returnTrivia.response_code === lintChato
    ) {
      history.push('/');
    }
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  startTimer = () => {
    const seconds = 1000;
    const timeOutID = setInterval(() => {
      const { time, isRunning } = this.state;
      if (isRunning && time > 0) {
        this.setState((prevState) => ({ time: prevState.time - 1 }));
      } else if (time === 0) {
        this.setState({ disabled: true, showColors: true, isShowing: true });
        this.stopTimer();
      }
    }, seconds);
    this.setState({ timeOutID });
  };

  stopTimer = () => {
    const { timeOutID } = this.state;
    clearInterval(timeOutID);
  };

  handleClick = () => {
    this.setState({ disabled: false, showColors: false, isShowing: false, time: 30 });
    this.setState((prev) => ({ count: prev.count + 1 }));
    this.startTimer();
    const { count, returnTrivia } = this.state;
    const { history } = this.props;
    const maxNum = 4;
    const numShuffle = 0.5;
    const alternatives = [
      ...returnTrivia.results[count === maxNum ? 0 : count + 1]
        .incorrect_answers,
      returnTrivia.results[count === maxNum ? 0 : count + 1].correct_answer,
    ];
    const shuffleAlternatives = alternatives.sort(
      () => Math.random() - numShuffle,
    );
    this.setState({ alternatives: shuffleAlternatives });
    if (count === maxNum) {
      history.push('/feedback');
    }
  };

  handleAnswer = (alternative) => {
    this.stopTimer();
    const initialScore = 10;
    const { dispatch } = this.props;
    const { returnTrivia, count, time } = this.state;
    this.setState({ showColors: true, disabled: true, isShowing: true });
    const answer = alternative === returnTrivia.results[count].correct_answer;

    if (answer) {
      dispatch(setAcertos());
      let total = 0;
      const easy = 1;
      const medium = 2;
      const hard = 3;
      switch (returnTrivia.results[count].difficulty) {
      case 'easy':
        total = total + initialScore + (time) * easy;
        break;
      case 'medium':
        total = total + initialScore + (time) * medium;
        break;
      case 'hard':
        total = total + initialScore + (time) * hard;
        break;
      default:
        break;
      }
      dispatch(setScore(total));
    }
  };

  render() {
    const { returnTrivia, count, alternatives, showColors, time,
      disabled, isShowing } = this.state;
    return (
      <>
        <Header />
        <h1>{time}</h1>
        <h2>
          {returnTrivia.response_code === 0 ? (
            <div>
              <p data-testid="question-category">
                {returnTrivia.results[count].category}
              </p>
              <p data-testid="question-text">
                {returnTrivia.results[count].question}
              </p>
              <div data-testid="answer-options">
                {alternatives.map((alternative, i) => {
                  const isCorrect = alternative
                  === returnTrivia.results[count].correct_answer;
                  return (
                    <button
                      style={
                        showColors
                          ? {
                            border: `3px solid 
                          ${isCorrect ? 'rgb(6, 240, 15)' : 'red'}`,
                          }
                          : null
                      }
                      disabled={ disabled }
                      data-testid={
                        alternative
                        === returnTrivia.results[count].correct_answer
                          ? 'correct-answer'
                          : `wrong-answer-${i}`
                      }
                      onClick={ () => {
                        this.handleAnswer(alternative);
                      } }
                      key={ alternative }
                    >
                      {alternative}
                    </button>
                  );
                })}
              </div>
              {
                isShowing ? (
                  <button data-testid="btn-next" onClick={ () => this.handleClick() }>
                    Next
                  </button>
                ) : null
              }
            </div>
          ) : null}
        </h2>
      </>
    );
  }
}
Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  difficulty: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};
const mapStateToProps = (state) => ({
  difficulty: state.settings.difficulty,
  type: state.settings.type,
  category: state.settings.category,
});
export default connect(mapStateToProps)(Game);

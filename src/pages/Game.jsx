import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import '../styles/game.css';

export default class Game extends React.Component {
  state = {
    returnTrivia: [],
    alternatives: [],
    count: 0,
    showColors: false,
  };

  componentDidMount() {
    const token = localStorage.getItem('token');
    fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.response_code === 0) {
          const numShuffle = 0.5;
          const alternatives = [...json.results[0].incorrect_answers,
            json.results[0].correct_answer];
          const shuffleAlternatives = alternatives.sort(() => Math.random() - numShuffle);
          this.setState({ returnTrivia: json, alternatives: shuffleAlternatives });
        } else {
          this.setState({ returnTrivia: json });
        }
      });
  }

  componentDidUpdate(prevState) {
    const lintChato = 3;
    const { history } = this.props;
    const { returnTrivia } = this.state;
    if (prevState.returnTrivia !== returnTrivia
      && (returnTrivia.response_code === lintChato)) {
      history.push('/');
    }
  }

  handleClick = () => {
    this.setState((prev) => ({ count: prev.count + 1 }));
    this.setState({ showColors: false });
    const { count, returnTrivia } = this.state;
    const { history } = this.props;
    const maxNum = 4;
    const numShuffle = 0.5;
    const alternatives = [...returnTrivia
      .results[count === maxNum ? 0 : count + 1].incorrect_answers,
    returnTrivia
      .results[count === maxNum ? 0 : count + 1].correct_answer];
    const shuffleAlternatives = alternatives.sort(() => Math.random() - numShuffle);
    this.setState({ alternatives: shuffleAlternatives });
    if (count === maxNum) {
      history.push('/');
    }
  };

  handleAnswer = () => {
    // const { returnTrivia, count } = this.state;
    this.setState({ showColors: true });
    // const answer = value === returnTrivia.results[count].correct_answer;
    // if (answer) {

    // }
  };

  render() {
    const { returnTrivia, count, alternatives, showColors } = this.state;
    return (
      <>
        <Header />
        <h2>
          {returnTrivia.response_code === 0 ? (
            <div>
              <p data-testid="question-category">
                {returnTrivia.results[count].category}
              </p>
              <p data-testid="question-text">
                {returnTrivia.results[count].question}
              </p>
              <div
                data-testid="answer-options"
              >
                {alternatives.map(
                  (alternative, i) => {
                    const isCorrect = alternative
                    === returnTrivia.results[count].correct_answer;
                    return (
                      <button
                        style={ showColors
                          ? { border: `3px solid 
                          ${isCorrect ? 'rgb(6, 240, 15)' : 'red'}` } : null }
                        data-testid={ alternative
                        === returnTrivia.results[count].correct_answer
                          ? 'correct-answer' : `wrong-answer-${i}` }
                        onClick={ (event) => {
                          this.handleAnswer(event);
                        } }
                        key={ alternative }
                      >
                        {alternative}
                      </button>
                    );
                  },
                )}
              </div>
              <button onClick={ () => this.handleClick() }>Próxima Pergunta</button>
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
};

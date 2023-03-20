import React from 'react';
import Header from '../components/Header';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Feedback extends React.Component {
  render() {
    const minAssertions = 3;
    const { score, assertions } = this.props;
    console.log(score);
    return (
      <div>
        <h1 data-testid="feedback-text">Feedback</h1>
        <h1 data-testid="feedback-total-score">{score}</h1>
        <h1 data-testid="feedback-total-question">{assertions}</h1>
      </div>
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
  // name: PropTypes.string.isRequired,
};
export default connect(mapStateToProps)(Feedback);

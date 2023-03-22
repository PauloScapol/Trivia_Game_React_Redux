import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setCategory, setType, setDifficulty } from '../redux/actions/index';

class Settings extends React.Component {
  state = {
    categories: [],
    category: '',
    difficulty: '',
    type: '',
  };

  async componentDidMount() {
    const response = await fetch('https://opentdb.com/api_category.php');
    const data = await response.json();
    this.setState({ categories: data.trivia_categories });
  }

  render() {
    const { categories } = this.state;
    return (
      <div data-testid="settings-title">
        <form>
          <label htmlFor="category">
            Category:
            <select
              name="category"
              id="category"
              onChange={ (event) => this.setState({ category: event.target.value }) }
            >
              {categories?.map((category) => (
                <option key={ category.id } value={ category.id }>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="difficulty">
            Difficulty:
            <select
              name="difficulty"
              id="difficulty"
              onChange={ (event) => this.setState({ difficulty: event.target.value }) }
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>
          <label htmlFor="type">
            Type:
            <select
              name="type"
              id="type"
              onChange={ (event) => this.setState({ type: event.target.value }) }
            >
              <option value="multiple">Multiple Choice</option>
              <option value="boolean">True / False</option>
            </select>
          </label>
          <button
            type="button"
            onClick={ () => {
              const { category, difficulty, type } = this.state;
              const { dispatch, history } = this.props;
              dispatch(setCategory(category));
              dispatch(setDifficulty(difficulty));
              dispatch(setType(type));
              history.push('/');
            } }
          >
            Save
          </button>
        </form>
      </div>
    );
  }
}
Settings.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default connect()(Settings);

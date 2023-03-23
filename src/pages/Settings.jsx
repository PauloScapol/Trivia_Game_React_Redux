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
      <div className="h-screen p-20 flex justify-center items-center">
        <form
          className="w-1/3 m-auto flex bg-white backdrop-blur-0
          bg-opacity-75 rounded-lg gap-4
        flex-col p-20 h-2/3 justify-center items-center"
        >
          <h1 className="text-3xl pb-5" data-testid="settings-title">Settings</h1>
          <label className="w-40 flex flex-col items-center text-lg" htmlFor="category">
            Category:
            <select
              className="w-[22rem] h-10 rounded-md border border-black"
              name="category"
              id="category"
              onChange={ (event) => this.setState({ category: event.target.value }) }
            >
              <option className="text-center" value="">All</option>
              {categories?.map((category) => (
                <option className="text-center" key={ category.id } value={ category.id }>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
          <label className="w-40 flex flex-col items-center text-lg" htmlFor="difficulty">
            Difficulty:
            <select
              className="w-[22rem] h-10 rounded-md border border-black"
              name="difficulty"
              id="difficulty"
              onChange={ (event) => this.setState({ difficulty: event.target.value }) }
            >
              <option className="text-center" value="">All</option>
              <option className="text-center" value="easy">Easy</option>
              <option className="text-center" value="medium">Medium</option>
              <option className="text-center" value="hard">Hard</option>
            </select>
          </label>
          <label className="w-40 flex flex-col items-center text-lg" htmlFor="type">
            Type:
            <select
              className="w-[22rem] h-10 rounded-md border border-black"
              name="type"
              id="type"
              onChange={ (event) => this.setState({ type: event.target.value }) }
            >
              <option className="text-center" value="">All</option>
              <option className="text-center" value="multiple">Multiple Choice</option>
              <option className="text-center" value="boolean">True / False</option>
            </select>
          </label>
          <button
            type="button"
            className="bg-blue-500 w-20 my-1
            hover:bg-blue-700 py-2 px-4 rounded-md
            text-white font-bold text-center"
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

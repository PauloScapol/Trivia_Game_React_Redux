import React, { Component } from 'react';

export default class Ranking extends Component {
  state = {
    ranking: [],
  };

  componentDidMount() {
    const LS = localStorage.getItem('players')
      ? JSON.parse(localStorage.getItem('players')) : [];
    console.log(LS);
    LS.sort((a, b) => b.score - a.score);
    this.setState({ ranking: LS });
  }

  render() {
    const { ranking } = this.state;
    return (
      <>
        <div data-testid="ranking-title">Ranking</div>
        {ranking?.map((player, index) => (
          <div key={ index }>
            <img src={ `https://www.gravatar.com/avatar/${player.picture}` } alt="player" />
            <h2>{player.name}</h2>
            <h2>{player.score}</h2>
          </div>
        ))}
      </>
    );
  }
}

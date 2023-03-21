import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';

afterEach(() => jest.clearAllMocks());

describe('17. Desenvolva testes para atingir 90% de cobertura da tela de Feedbacks', () => {
  const initialState = { player: {
    name: 'Teste',
    assertions: 0,
    score: 0,
    gravatarEmail: 'teste@hotmail.com',
  }, };

  const route = '/feedback';

  test('A rota para esta página deve ser /feedback', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback');

    expect(history.location.pathname).toBe('/feedback');
  });

  describe('Testar se os campos de texto e botões estão na tela', () => {
    test('Um texto com o desempenho do usuário na trivia está na tela', () => {
      renderWithRouterAndRedux(<App />, initialState, route);

      const feedbackInfo = screen.getByText('Could be better...');
      expect(feedbackInfo).toBeInTheDocument();
    });

    // test('Os botões "Ranking" e "Play Again" estão na tela', () => {
    //   renderWithRouterAndRedux(<App />, initialState, route);

    //   const rankingBtn = screen.getByTestId('btn-ranking');
    //   expect(rankingBtn).toBeInTheDocument();

    //   const playAgainBtn = screen.getByTestId('btn-play-again');
    //   expect(playAgainBtn).toBeInTheDocument();
    // });
  });

  describe('Testar o funcionamento de redirecionamento dos botões', () => {
    test('Ao clicar o botão "Ranking", é redirecionado a página ranking', async () => {
      window.localStorage.setItem('ranking', JSON.stringify([{name: 'Teste', email: 'teste@hotmail.com', score: 0}]));

      const { history } = renderWithRouterAndRedux(<App />, initialState, route);

      const rankingBtn = screen.getByTestId('btn-ranking');
      userEvent.click(rankingBtn);

      expect(history.location.pathname).toBe('/ranking');
    });

    // test('Ao clicar no botão "Play Again", é redirecionado a página Login', () => {

    // });
  });
});

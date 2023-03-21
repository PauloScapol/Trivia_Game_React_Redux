import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';

afterEach(() => jest.clearAllMocks());

describe('20. Desenvolva testes para atingir 90% de cobertura da tela de Ranking', () => {
  const route = '/ranking';

  test('A rota para esta página deve ser /ranking', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/ranking');

    expect(history.location.pathname).toBe('/ranking');
  });

  test('Botão "Go Home" está na tela e ao ser clicado redireciona para Home', () => {
    window.localStorage.setItem('ranking', JSON.stringify([{name: 'Teste', email: 'teste@hotmail.com', score: 0}]));

    const { history } = renderWithRouterAndRedux(<App />, {}, route);
    const homeBtn = screen.getByTestId('btn-go-home');

    expect(homeBtn).toBeInTheDocument();
    userEvent.click(homeBtn);

    expect(history.location.pathname).toBe('/');
  });

  test('Se não tem players no ranking, retorna um array vazio', () => {
    localStorage.clear();

    const initialState = {
      players: JSON.parse(localStorage.getItem('ranking')) || [],
    };

    renderWithRouterAndRedux(<App />, initialState, route);

    expect(initialState.players).toHaveLength(0);
  });
});
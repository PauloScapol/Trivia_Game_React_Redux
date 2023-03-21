import React from 'react';
import Home from '../pages/Home';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { screen } from '@testing-library/react';

describe('Testes para a página Home', () => {
  test('Texto "Home" está na tela', () => {
    renderWithRouterAndRedux(<Home />);

    const text = screen.getByText('Home');
    expect(text).toBeInTheDocument();
  });
});

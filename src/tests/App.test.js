import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('testando componente App', () => {
  test('O topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: /Home/i });
    const aboutLink = screen.getByRole('link', { name: /About/i });
    const favoritePokemonsLink = screen.getByRole('link', { name: /Favorite Pokémons/i });

    expect(homeLink).toBeDefined();
    expect(aboutLink).toBeDefined();
    expect(favoritePokemonsLink).toBeDefined();
  });

  test('Ao clicar no link Home,retorna para URL /', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: /Home/i });
    userEvent.click(homeLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Ao clicar no link About,retorna para URL /about', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: /About/i });
    userEvent.click(aboutLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Ao clicar no link Favorite Pokémons,retorna para URL /favorites', () => {
    const { history } = renderWithRouter(<App />);

    const favoritePokemonsLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(favoritePokemonsLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('Redirecionada para a página Not Found ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/Barabam');

    const notFoundTitle = screen.getByRole('heading',
      { name: /Page requested not found/i });
    expect(notFoundTitle).toBeDefined();
  });
});

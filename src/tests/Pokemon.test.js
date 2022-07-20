import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testando o componente Pokemon', () => {
  test('É renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    const pokemon = pokemons[0];

    const { averageWeight: { value, measurementUnit } } = pokemon;

    const name = screen.getByTestId('pokemon-name');
    expect(name).toBeDefined();
    expect(name.innerHTML).toBe(pokemon.name);

    const type = screen.getByTestId('pokemon-type');
    expect(type).toBeDefined();
    expect(type.innerHTML).toBe(pokemon.type);

    const weight = screen.getByTestId('pokemon-weight');
    expect(weight).toBeDefined();
    expect(weight.innerHTML).toBe(`Average weight: ${value} ${measurementUnit}`);

    const image = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(image).toBeDefined();
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('pokémon indicado contém um link de navegação para exibir detalhes', () => {
    const { history } = renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: /More details/i });
    userEvent.click(link);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  test('clicar no link more details, é feito o redirecior Pokemon Details', () => {
    renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: /More details/i });
    userEvent.click(link);

    const sumamry = screen.getByRole('heading', { name: /summary/i });
    expect(sumamry).toBeDefined();
  });

  test('existe um ícone de estrela nos pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/pokemons/25');
    const bookmark = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    userEvent.click(bookmark);

    history.push('/favorites');

    const imgFavorite = screen.getByRole('img',
      { name: /pikachu is marked as favorite/i });

    expect(imgFavorite).toHaveProperty('src', 'http://localhost/star-icon.svg');
  });
});

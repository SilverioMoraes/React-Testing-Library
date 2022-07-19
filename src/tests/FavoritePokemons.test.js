import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import userEvent from '@testing-library/user-event';
import { FavoritePokemons } from '../pages';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Testando o componente NotFound', () => {
  test('mensagem No favorite pokemon found, caso não tenha pokémons favoritos', () => {
    renderWithRouter(<FavoritePokemons />);

    const message = screen.getByText(/No favorite pokemon found/i);
    expect(message).toBeDefined();
  });

  test('São exibidos todos os cards de pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/pokemons/25');
    const bookmark = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    userEvent.click(bookmark);

    history.push('/favorites');
    const imagePokemon = screen.getByRole('img', { name: /Pikachu sprite/i });
    const imageStarFavorite = screen.getByRole('img', { name:
      /Pikachu is marked as favorite/i,
    });
    expect(imagePokemon).toBeDefined();
    expect(imagePokemon.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');

    expect(imageStarFavorite).toBeDefined();
    expect(imageStarFavorite.src).toBe('http://localhost/star-icon.svg');
  });
});

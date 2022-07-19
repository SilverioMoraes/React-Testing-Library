import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Testando o componente Pokedex', () => {
  test('A página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const headingTitle = screen.getAllByRole('heading', {
      name: /Encountered pokémons/i,
    });
    expect(headingTitle).toBeDefined();
  });

  test('É exibido o próximo pokémon da lista quando o botão é clicado', () => {
    renderWithRouter(<App />);

    const button = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(button).toBeDefined();

    pokemons.forEach((pokemon) => {
      expect(screen.getByText(`${pokemon.name}`)).toBeDefined();
      userEvent.click(button);
    });

    expect(screen.getByText(/pikachu/i)).toBeDefined();
  });

  test('É mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getAllByTestId('pokemon-name');
    expect(pokemonName.length).toBe(1);
  });

  test('A Pokédex tem os botões de filtro', () => {});
  renderWithRouter(<App />);

  const buttons = screen.getAllByTestId('pokemon-type-button');
  const pokemonsTypes = [
    'Electric',
    'Fire',
    'Bug',
    'Poison',
    'Psychic',
    'Normal',
    'Dragon',
  ];

  buttons.forEach((type, i) => {
    expect(type.innerHTML).toBe(pokemonsTypes[i]);
  });

  const btnBug = screen.getByRole('button', { name: /Bug/i });
  expect(btnBug).toBeDefined();
  userEvent.click(btnBug);

  const pokemonBug = screen.getByText(/Caterpie/i);
  expect(pokemonBug).toBeDefined();

  test('A Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const btnAll = screen.getByRole('button', { name: /All/i });
    expect(btnAll).toBeDefined();
    userEvent.click(btnAll);

    const firstPokemon = screen.getByText(/Pikachu/i);
    expect(firstPokemon).toBeDefined();
  });
});

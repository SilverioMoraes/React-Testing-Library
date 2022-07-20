import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Testando o componente Pokemon Details', () => {
  test('As informações detalhadas do pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);

    const linkDetail = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetail);

    const detailTitle = screen.getByRole('heading', { name: /pikachu details/i });
    expect(detailTitle).toBeDefined();

    expect(linkDetail).not.toBeInTheDocument();

    const summary = screen.getByRole('heading', { name: /summary/i, leve: 2 });
    expect(summary).toBeDefined();

    const pokemonSummary = screen.getByText(/This intelligent Pokémon roasts /i);
    expect(pokemonSummary).toBeDefined();
  });

  test('existe uma seção com os mapas contendo as localizações do pokémon', () => {
    renderWithRouter(<App />);

    const linkDetail = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetail);

    const locationTitle = screen.getByRole('heading',
      { name: /Game Locations of Pikachu/i, level: 2 });

    expect(locationTitle).toBeDefined();

    const locationOne = screen.getByText(/Kanto Viridian Forest/i);
    expect(locationOne).toBeDefined();

    const locationTwo = screen.getByText(/Kanto Power Plant/i);
    expect(locationTwo).toBeDefined();

    const imageMapOne = screen.getAllByRole('img', { name: /pikachu location/i })[0];
    expect(imageMapOne.src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');

    const imageMapTwo = screen.getAllByRole('img', { name: /pikachu location/i })[1];
    expect(imageMapTwo.src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  test('O usuário pode favoritar um pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);
    const linkDetail = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetail);

    const checkbox = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });

    expect(checkbox).toBeDefined();
  });
});

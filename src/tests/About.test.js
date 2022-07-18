import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import { About } from '../pages';

describe('Testando o componente About', () => {
  test('A página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const infoPokedex = screen.getByRole('heading', { name: /Pokédex/i });
    expect(infoPokedex).toBeDefined();
  });

  test('A página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const heading = screen.getByRole('heading', {
      name: /About Pokédex/i, leve: 2 });
    expect(heading).toBeDefined();
  });

  test('A página contém dois parágrafos com texto sobre a Pokédex ', () => {
    renderWithRouter(<About />);

    const paragraphOne = screen.getByText(/This application simulates/i);
    const paragraphTwo = screen.getByText(/One can filter Pokémons/i);

    expect(paragraphOne).toBeDefined();
    expect(paragraphTwo).toBeDefined();
  });

  test('A página contém dois parágrafos com texto sobre a Pokédex ', () => {
    renderWithRouter(<About />);

    const image = screen.getByRole('img', { name: /Pokédex/i });

    expect(image).toBeDefined();
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});

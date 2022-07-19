import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import { NotFound } from '../pages';

describe('Testando o componente NotFound', () => {
  test('A página contém um heading h2 com o texto Page requested not found 😭', () => {
    renderWithRouter(<NotFound />);

    const notFoundTitle = screen.getByRole('heading',
      { name: /Page requested not found/i, level: 2 });
    expect(notFoundTitle).toBeDefined();
  });

  test('A página mostra a imagem', () => {
    renderWithRouter(<NotFound />);

    const imageNotFound = screen.getByRole('img', {
      name: /Pikachu crying because the page requested was not found/i,
    });
    expect(imageNotFound).toBeDefined();
    expect(imageNotFound.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});

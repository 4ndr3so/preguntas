import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Pregunta from './Pregunta';

describe('<Pregunta />', () => {
  test('it should mount', () => {
    render(<Pregunta />);
    
    const pregunta = screen.getByTestId('Pregunta');

    expect(pregunta).toBeInTheDocument();
  });
});
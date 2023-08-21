import React from 'react';
import { render, screen } from '@testing-library/react';
import Routers from '../Route';

test('renders App routing component', () => {
  render(<Routers />);
  const linkElement = screen.getByTestId("app");
  expect(linkElement).toBeInTheDocument();
});

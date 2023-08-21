import React from 'react';
import { render, screen } from '@testing-library/react';
import Routers from './Route/Routers';

test('renders App routing component', () => {
  render(<Routers />);
  const linkElement = screen.getByTestId("hello");
  expect(linkElement).toBeInTheDocument();
});

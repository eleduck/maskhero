/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders root component with no error', () => {
  const { getByTestId } = render(<App />);
  const rootComponent = getByTestId("rootComponent");
  expect(rootComponent).not.toBeEmpty();
});

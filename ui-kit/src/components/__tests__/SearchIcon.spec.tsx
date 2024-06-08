import React from 'react';
import { render } from '@testing-library/react';
import { SearchIcon } from '../icons/SearchIcon';

describe('SearchIcon', () => {
  it('should match the snapshot', () => {
    const { asFragment } = render(<SearchIcon />);
    expect(asFragment()).toMatchSnapshot();
  });
});

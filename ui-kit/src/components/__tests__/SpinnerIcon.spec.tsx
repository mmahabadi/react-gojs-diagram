import React from 'react';
import { render } from '@testing-library/react';
import { SpinnerIcon } from '../icons/SpinnerIcon';

describe('SpinnerIcon', () => {
  it('should match the snapshot', () => {
    const { asFragment } = render(<SpinnerIcon />);
    expect(asFragment()).toMatchSnapshot();
  });
});

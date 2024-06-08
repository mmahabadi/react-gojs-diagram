import React from 'react';
import { render } from '@testing-library/react';
import { SuccessIcon } from '../icons/SuccessIcon';

describe('SuccessIcon', () => {
  it('should match the snapshot', () => {
    const { asFragment } = render(<SuccessIcon />);
    expect(asFragment()).toMatchSnapshot();
  });
});

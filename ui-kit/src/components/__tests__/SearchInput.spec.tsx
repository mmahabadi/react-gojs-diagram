import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { SearchInput } from '../SearchInput';

describe('SearchInput', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('displays the spinner when loading', () => {
    render(<SearchInput loading={true} value="" onChange={mockOnChange} />);
    expect(screen.getByRole('status')).toBeTruthy();
  });

  it('calls onChange when the user types in the input', () => {
    render(<SearchInput value="" onChange={mockOnChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(mockOnChange).toHaveBeenCalledWith('test');
  });

  it('handles onKeyDown events', () => {
    render(<SearchInput value="initial" onChange={mockOnChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(mockOnChange).toHaveBeenCalledWith('initial');
  });

  it('shows a placeholder when provided', () => {
    render(
      <SearchInput
        value=""
        placeholder="Search here..."
        onChange={mockOnChange}
      />
    );
    expect(screen.getByPlaceholderText('Search here...')).toBeTruthy();
  });
});

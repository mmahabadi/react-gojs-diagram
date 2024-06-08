import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { SearchableDropDownList } from '../searchable-dropdown/SearchableDropDownList';

describe('SearchableDropDownList', () => {
  const mockOptions = [
    { text: 'Item 1', value: '1' },
    { text: 'Item 2', value: '2' },
  ];

  it('renders options correctly', () => {
    const { getAllByRole } = render(
      <SearchableDropDownList options={mockOptions} onSelect={jest.fn()} />
    );
    const listsItems = getAllByRole('listitem');
    expect(listsItems.length).toBe(mockOptions.length);
    expect(listsItems[0].textContent).toContain('Item 1');
    expect(listsItems[1].textContent).toContain('Item 2');
  });

  it('calls onSelect with the correct item when clicked', () => {
    const mockOnSelect = jest.fn();
    const { getByText } = render(
      <SearchableDropDownList options={mockOptions} onSelect={mockOnSelect} />
    );

    fireEvent.click(getByText('Item 1'));
    expect(mockOnSelect).toHaveBeenCalledWith(mockOptions[0]);

    fireEvent.click(getByText('Item 2'));
    expect(mockOnSelect).toHaveBeenCalledWith(mockOptions[1]);
  });
});

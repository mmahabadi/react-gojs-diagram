import { FC, useRef, useState } from 'react';
import { useClickedOutsideElement } from '../../hooks/useClickedOutsideElement';
import { SearchInput } from '../searchInput';
import { SearchableDropDownList } from './SearchableDropDownList';
import styles from './SearchableDropdown.module.css';
import { DropdownItem } from './types';

type typeprops = {
  options: DropdownItem[];
  onSelect: (option: string) => void;
  placeholder: string;
  loading?: boolean;
};
export const SearchableDropdown: FC<typeprops> = ({
  options,
  onSelect,
  placeholder,
  loading,
}) => {
  const searchRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);

  useClickedOutsideElement([searchRef, dropdownRef], () =>
    setShowDropdown(false)
  );

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredOptions(
      options.filter((option) =>
        option.text.toLowerCase().includes(term.toLowerCase())
      )
    );
  };

  const handleSelect = (selected: DropdownItem) => {
    setSearchTerm(selected.text);
    setShowDropdown(false);
    onSelect(selected.value);
  };

  return (
    <div className={styles.search}>
      <div
        className={styles.searchContainer}
        ref={searchRef}
        onClick={() => setShowDropdown(true)}
      >
        <SearchInput
          value={searchTerm}
          onChange={handleSearch}
          placeholder={placeholder}
          loading={loading}
        />
      </div>
      {showDropdown && (
        <div ref={dropdownRef}>
          <SearchableDropDownList
            options={filteredOptions}
            onSelect={handleSelect}
          />
        </div>
      )}
    </div>
  );
};

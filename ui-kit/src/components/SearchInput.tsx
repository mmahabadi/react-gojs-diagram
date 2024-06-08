import { FC, ReactEventHandler } from 'react';
import styles from './SearchInput.module.css';
import { SearchIcon } from './icons/SearchIcon';
import { SpinnerIcon } from './icons/SpinnerIcon';

type proptypes = {
  value: string;
  loading?: boolean;
  placeholder?: string;
  onChange: (q: string) => void;
};

export const SearchInput: FC<proptypes> = ({
  loading,
  value,
  onChange,
  placeholder,
}) => {
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const term = (e.target as HTMLInputElement).value;
    onChange(term);
  };

  return (
    <>
      {loading && (
        <div className={styles.loading} role="status">
          <SpinnerIcon />
          <span className="sr-only">Loading...</span>
        </div>
      )}
      <input
        data-testid="search-input"
        value={value}
        onKeyDown={handleSearch}
        onChange={handleSearch as ReactEventHandler<HTMLInputElement>}
        type="text"
        placeholder={placeholder}
        className={styles.searchInput}
      />
      <button className={styles.searchBtn}>
        <SearchIcon />
      </button>
    </>
  );
};

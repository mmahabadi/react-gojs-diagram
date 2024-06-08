import { FC, useRef, useState } from 'react';
import { DropdownItem } from './types';
import styles from './SearchableDropdownList.module.css';

const ITEM_HEIGHT = 35;
const VISIBLE_COUNT = 10;

type proptypes = {
  options: DropdownItem[];
  onSelect: (option: DropdownItem) => void;
  itemHeight?: number;
  visibleCount?: number;
};
export const SearchableDropDownList: FC<proptypes> = ({
  options,
  onSelect,
  itemHeight = ITEM_HEIGHT,
  visibleCount = VISIBLE_COUNT,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    if (dropdownRef?.current) {
      setScrollPosition(dropdownRef.current.scrollTop);
    }
  };

  const itemsCount = options.length === 0 ? 1 : options.length;
  const startIndex = Math.floor(scrollPosition / itemHeight);
  const endIndex = Math.min(startIndex + visibleCount, itemsCount);
  const visibleOptions = options.slice(startIndex, endIndex);

  return (
    <div ref={dropdownRef} className={styles.dropdown} onScroll={handleScroll}>
      <ul
        style={{ height: itemsCount * itemHeight }}
        className={styles.dropdownList}
        data-testid="dropdown-list"
      >
        {visibleOptions?.map((item, index) => (
          <li
            key={item.value}
            onClick={() => onSelect(item)}
            className={styles.dropdownItem}
            style={{
              top: (startIndex + index) * itemHeight,
              height: itemHeight,
              position: 'absolute',
              width: '100%',
            }}
            data-testid="dropdown-item"
          >
            {item.text}
          </li>
        ))}
        {visibleOptions?.length === 0 && (
          <li
            className={styles.dropdownItem}
            style={{
              height: itemHeight,
              width: '100%',
            }}
          >
            No results found
          </li>
        )}
      </ul>
    </div>
  );
};

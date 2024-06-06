import { RefObject, useEffect } from 'react';

export const useClickedOutsideElement = (
  elementRefs: RefObject<HTMLElement>[],
  setClickedOutside: () => void
) => {
  const handleClickOutside = (event: MouseEvent) => {
    const isClickedInside = elementRefs.some((elementRef) => {
      return (
        elementRef.current && elementRef.current.contains(event.target as Node)
      );
    });
    if (!isClickedInside) setClickedOutside();
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
};

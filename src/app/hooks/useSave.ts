import { useCallback, useRef, useState } from 'react';

export const useDebaouncedSave = (delay: number) => {
  const [loading, setLoading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const save = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    setLoading(true);
    timer.current = setTimeout(() => {
      setLoading(false);
    }, delay);
  }, [delay]);

  return { loading, save };
};

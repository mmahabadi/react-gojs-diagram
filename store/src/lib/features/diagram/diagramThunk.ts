import { createAsyncThunk } from '@reduxjs/toolkit';
import { DiagramState, Node, Link } from '../../../types';

const MaxPossibleNumberForColors = 256 * 256 * 256; //#FFFFFF
const MaxNodes = 10000;
const MaxLinks = 9999;

export const fetchData = createAsyncThunk('diagram/fetchData', () => {
  const nodes = Array.from(
    { length: MaxNodes },
    (_, i) =>
      ({
        key: `node-${i + 1}`,
        text: `Node ${i + 1}`,
        color: `#${Math.floor(Math.random() * MaxPossibleNumberForColors)
          .toString(16)
          .padStart(6, '0')}`,
        fontSize: 12,
      } as Node)
  );
  const links = Array.from(
    { length: MaxLinks },
    (_, i) =>
      ({
        from: `node-${i + 1}`,
        to: `node-${i + 2}`,
        text: `Link ${i + 1}`,
        fontSize: 24,
      } as Link)
  );
  return { nodes, links } as Partial<DiagramState>;
});

let timeoutId: ReturnType<typeof setTimeout> | null = null;

export const saveChanges = createAsyncThunk('diagram/saveChanges', async () => {
  if (timeoutId !== null) {
    clearTimeout(timeoutId);
  }
  const promise = new Promise<void>((resolve) => {
    timeoutId = setTimeout(() => {
      resolve();
      timeoutId = null;
      //todo: move the timeout to env
    }, 5000);
  });
  return await promise;
});

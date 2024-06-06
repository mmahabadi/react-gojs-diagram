import { useEffect, useState } from 'react';
import { Link, Node } from '@store';

/**
 * @deprecated use dispatch(fetchData()) instead
 * @param nodeCount
 * @param linkCount
 * @returns nodes and links
 */
export const useMockData = (nodeCount: number, linkCount: number) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [links, setLinks] = useState<Link[]>([]);

  useEffect(() => {
    const MaxPossibleNumberForColors = 256 * 256 * 256; //#FFFFFF
    const MaxNodes = nodeCount;
    const MaxLinks = linkCount;

    console.log('Generating mock data');

    const nodeDataArray = Array.from(
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
    const linkDataArray = Array.from(
      { length: MaxLinks },
      (_, i) =>
        ({
          from: `node-${i + 1}`,
          to: `node-${i + 2}`,
          text: `Link ${i + 1}`,
          fontSize: 24,
        } as Link)
    );
    setNodes(nodeDataArray);
    setLinks(linkDataArray);
  }, [nodeCount, linkCount]);

  return { nodes, links };
};

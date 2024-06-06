import React from 'react';
import { Node } from '../types';
import { SearchableDropdown } from '@ui-kit';

interface NodeDropdownProps {
  nodes: Node[];
  onSelectNode: (nodeKey: string) => void;
}

const NodeDropdown: React.FC<NodeDropdownProps> = ({ nodes, onSelectNode }) => {
  const options = nodes.map((node) => ({ text: node.text, value: node.key }));
  return (
    <SearchableDropdown
      options={options}
      placeholder="Select a node"
      onSelect={onSelectNode}
      key={options.length}
    />
  );
};

export default NodeDropdown;

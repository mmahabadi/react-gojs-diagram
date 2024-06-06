import React from 'react';
import { SearchableDropdown } from '@ui-kit';
import { selectNodes, useAppSelector, Node, useAppDispatch, selectNode } from '@store';


const NodeDropdown: React.FC = () => {
  const dispatch = useAppDispatch();
  const nodes = useAppSelector(selectNodes);
  const options = nodes.map((node: Node) => ({
    text: node.text,
    value: node.key,
  }));

  const onSelectNode = (nodeKey: string) => {
    dispatch(selectNode(nodeKey))
  }
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

import React, { FC, useCallback, useEffect, useRef } from 'react';
import { ReactDiagram } from 'gojs-react';
import { Link, Node } from '../types';
import { DiagramBuilder } from '../services/DiagramBuilder';

type proptypes = {
  nodes: Node[];
  links: Link[];
  selectedNodeKey: string | null;
  onChange: () => void;
};

const Diagram: FC<proptypes> = ({
  nodes,
  links,
  selectedNodeKey,
  onChange,
}) => {
  const diagramRef: React.RefObject<ReactDiagram> = useRef(null);
  console.log('Diagram rendered');

  useEffect(() => {
    const diagram = diagramRef.current?.getDiagram();
    if (!diagram) {
      return;
    }
    if (diagram) {
      diagram.addDiagramListener('SelectionMoved', onChange);
      diagram.addDiagramListener('PartResized', onChange);
      diagram.addDiagramListener('TextEdited', onChange);

      if (selectedNodeKey) {
        const node = diagram.findNodeForKey(selectedNodeKey);
        if (node) {
          diagram.select(node);
        }
      }
    }

    return () => {
      if (diagram) {
        diagram.removeDiagramListener('SelectionMoved', onChange);
        diagram.removeDiagramListener('PartResized', onChange);
        diagram.removeDiagramListener('TextEdited', onChange);
      }
    };
  }, [selectedNodeKey, onChange]);

  const initDiagram = useCallback(() => {
    return new DiagramBuilder()
      .buildNodeTemplate()
      .buildLinkTemplate()
      .generateDiagram();
  }, []);
  
  return (
    <ReactDiagram
      ref={diagramRef}
      initDiagram={initDiagram}
      divClassName="w-full h-full"
      nodeDataArray={nodes}
      linkDataArray={links}
      onModelChange={onChange}
    />
  );
};
export default React.memo(Diagram);

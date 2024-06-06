import React, { FC, useCallback, useEffect, useRef } from 'react';
import { ReactDiagram } from 'gojs-react';
import { DiagramBuilder } from '../services/DiagramBuilder';
import {
  selectLinks,
  selectNodes,
  saveChanges,
  useAppDispatch,
  useAppSelector,
  selectSelectedNodeKey,
} from '@store';

const Diagram: FC = () => {
  const diagramRef: React.RefObject<ReactDiagram> = useRef(null);
  const dispatch = useAppDispatch();
  const nodes = useAppSelector(selectNodes);
  const links = useAppSelector(selectLinks);
  const selectedNodeKey = useAppSelector(selectSelectedNodeKey);

  const handleChange = useCallback(() => {
    dispatch(saveChanges());
  }, [dispatch]);

  useEffect(() => {
    const diagram = diagramRef.current?.getDiagram();
    if (!diagram) {
      return;
    }
    if (diagram) {
      diagram.addDiagramListener('SelectionMoved', handleChange);
      diagram.addDiagramListener('PartResized', handleChange);
      diagram.addDiagramListener('TextEdited', handleChange);

      if (selectedNodeKey) {
        const node = diagram.findNodeForKey(selectedNodeKey);
        if (node) {
          diagram.select(node);
        }
      }
    }

    return () => {
      if (diagram) {
        diagram.removeDiagramListener('SelectionMoved', handleChange);
        diagram.removeDiagramListener('PartResized', handleChange);
        diagram.removeDiagramListener('TextEdited', handleChange);
      }
    };
  }, [selectedNodeKey, handleChange]);

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
      onModelChange={handleChange}
    />
  );
};
export default React.memo(Diagram);

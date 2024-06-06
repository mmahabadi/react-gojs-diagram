import React, { useState } from 'react';
import DiagramComponent from './components/Diagram';
import NodeDropdown from './components/NodeDropdown';
import SaveIcon from './components/SaveIcon';
import { useMockData } from './hooks/useMockData';
import { useDebaouncedSave } from './hooks/useSave';
import styles from './app.module.css';

const App: React.FC = () => {
  const { nodes, links } = useMockData(10000, 9999);
  const { loading: isSaving, save } = useDebaouncedSave(5000);
  const [selectedNodeKey, setSelectedNodeKey] = useState<string | null>(null);
  console.log('App rendered');
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <NodeDropdown
          nodes={nodes}
          onSelectNode={(selected: string) => setSelectedNodeKey(selected)}
        />
        <SaveIcon isSaving={isSaving} />
      </div>
      <div className={styles.content}>
        <DiagramComponent
          nodes={nodes}
          links={links}
          selectedNodeKey={selectedNodeKey}
          onChange={save}
        />
      </div>
    </main>
  );
};

export default App;

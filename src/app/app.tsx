import React, { useEffect } from 'react';
import DiagramComponent from './components/Diagram';
import NodeDropdown from './components/NodeDropdown';
import SaveIcon from './components/SaveIcon';
import { fetchData, useAppDispatch } from '@store';

import styles from './app.module.css';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  //this hook was used to generate mock data before adding redux-toolkit
  // const { nodes, links } = useMockData(10000, 9999);
  //this hook was used to save the data after a delay
  // const { loading: isSaving, save } = useDebaouncedSave(5000);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <NodeDropdown />
        <SaveIcon />
      </div>
      <div className={styles.content}>
        <DiagramComponent />
      </div>
    </main>
  );
};

export default App;

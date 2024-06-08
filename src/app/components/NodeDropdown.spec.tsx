import { Provider } from 'react-redux';
import NodeDropdown from './NodeDropdown';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { RootState, initialState } from '@store';

const mockStore = configureStore([]);

describe('NodeDropdown', () => {
  let store: RootState & { dispatch: any };

  beforeEach(() => {
    store = mockStore({
      diagram: initialState,
    }) as any;

    store.dispatch = jest.fn();
  });

  const renderComponent = () => {
    return render(
      <Provider store={store as any}>
        <NodeDropdown />
      </Provider>
    );
  };
  it('should match the snapshot', () => {
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });
});

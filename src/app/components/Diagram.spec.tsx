import { RootState, initialState } from '@store';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Diagram from './Diagram';

jest.mock('gojs-react', () => ({
  ReactDiagram: jest.fn().mockImplementation(({ initDiagram, ...props }) => {
    return (
      <div {...props} ref={props.ref}>
        Diagram placeholder
      </div>
    );
  }),
}));

jest.mock('@store', () => ({
  useAppDispatch: () => jest.fn(),
  useAppSelector: jest.fn(() => initialState),
  saveChanges: jest.fn(() => ({ type: 'SAVE_CHANGES' })),
}));

const mockStore = configureStore([]);

describe('Diagram', () => {
  let store: RootState & { dispatch: any };

  const renderComponent = () => {
    return render(
      <Provider store={store as any}>
        <Diagram />
      </Provider>
    );
  };
  beforeEach(() => {
    store = mockStore({
      diagram: initialState,
    }) as any;

    store.dispatch = jest.fn();
  });

  it('renders the Diagram component and matches snapshot', () => {
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });
});

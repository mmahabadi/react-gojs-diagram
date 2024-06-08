import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import App from './app';
import { RootState, fetchData, initialState, useAppDispatch } from '@store';
import { render } from '@testing-library/react';

jest.mock('./components/Diagram', () => {
  return {
    __esModule: true,
    default: () => <div>DiagramComponent</div>,
  };
});

jest.mock('@store', () => ({
  ...jest.requireActual('@store'),
  fetchData: jest.fn(() => ({ type: 'diagram/fetchData' })),
  useAppDispatch: jest.fn(),
}));
const mockStore = configureStore([]);
describe('App', () => {
  let store: RootState & { dispatch: any };
  const mockedDispatch = jest.fn();

  beforeEach(() => {
    store = mockStore({
      diagram: initialState,
    }) as any;

    store.dispatch = jest.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(mockedDispatch);
  });

  const renderComponent = () => {
    return render(
      <Provider store={store as any}>
        <App />
      </Provider>
    );
  };
  it('should match the snapshot', () => {
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should dispatch fetchData on mount', () => {
    renderComponent();
    expect(mockedDispatch).toHaveBeenCalledWith(fetchData());
  });
});

import { RootState, initialState, useAppSelector } from '@store';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import SaveIcon from './SaveIcon';
import { Provider } from 'react-redux';

jest.mock('@store', () => ({
  useAppSelector: jest.fn(),
  selectLoading: jest.fn(),
}));

const mockStore = configureStore([]);

describe('SaveIcon', () => {
  let store: RootState & { dispatch: any };

  beforeEach(() => {
    store = mockStore({
      diagram: initialState,
    }) as any;

    store.dispatch = jest.fn();
    (useAppSelector as jest.Mock).mockClear();
  });

  const renderComponent = () => {
    return render(
      <Provider store={store as any}>
        <SaveIcon />
      </Provider>
    );
  };

  it('should match the snapshot', () => {
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should display saving state', () => {
    (useAppSelector as jest.Mock).mockReturnValue(true);

    const { getByTestId, getByText, queryByText, queryByTestId } =
      renderComponent();

    expect(getByText('Saving...')).toBeTruthy();
    expect(getByTestId('spinner-icon')).toBeTruthy();
    expect(queryByText('Saved')).toBeNull();
    expect(queryByTestId('success-icon')).toBeFalsy();
  });

  it('should display saved state', () => {
    (useAppSelector as jest.Mock).mockReturnValue(false);

    const { getByText, getByTestId, queryByText, queryByTestId } =
      renderComponent();

    expect(getByText('Saved')).toBeTruthy();
    expect(getByTestId('success-icon')).toBeTruthy();
    expect(queryByText('Saving...')).toBeFalsy();
    expect(queryByTestId('spinner-icon')).toBeFalsy();
  });
});

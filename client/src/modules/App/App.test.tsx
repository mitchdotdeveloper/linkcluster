import { App } from 'modules/App/App';
import { render } from '@testing-library/react';

describe('App test suite', () => {
  it('App renders correctly', () => {
    const { asFragment } = render(<App />);

    expect(asFragment).toMatchSnapshot();
  });
});

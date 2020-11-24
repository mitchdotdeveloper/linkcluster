import { Hi } from 'components/Hi/Hi';
import { render } from '@testing-library/react';

describe('test', () => {
  it('renders', () => {
    const { asFragment } = render(<Hi message={'My name is Mitch!'} />);

    expect(asFragment()).toMatchSnapshot();
  });
});

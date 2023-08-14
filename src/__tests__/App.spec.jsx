import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

const MockApp = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};
it('renders without exploding', () => {
  render(<MockApp />);
});

import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from "react-router-dom";
import App from './App';

test('renders Aadhaar form title on Step 1', () => {
  render(
    <Router>
      <App />
    </Router>
  );
  // Look for Step 1 header text
  const headerElement = screen.getByText(/Aadhaar Verification With OTP/i);
  expect(headerElement).toBeInTheDocument();
});

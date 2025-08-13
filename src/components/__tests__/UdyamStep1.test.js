import { render, screen, fireEvent } from '@testing-library/react';
import UdyamStep1 from '../UdyamStep1';

test('Step 1 enables submit when form is valid', () => {
  render(<UdyamStep1 onAadhaarValidated={() => {}} />);

  const btn = screen.getByRole('button', { name: /Validate & Generate OTP/i });
  expect(btn).toBeDisabled();

  fireEvent.change(screen.getByPlaceholderText(/Your Aadhaar No/i), { target: { value: '123456789012' } });
  fireEvent.change(screen.getByPlaceholderText(/Name as per Aadhaar/i), { target: { value: 'John Doe' } });
  fireEvent.click(
    screen.getByLabelText(/I, the holder of the above Aadhaar/i)
  );

  expect(btn).not.toBeDisabled();
});

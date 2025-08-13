import { render, screen, fireEvent } from '@testing-library/react';
import UdyamStep2 from '../UdyamStep2';

test('Step 2 enables submit when form is valid', () => {
  const aadhaarData = {
    "ctl00$ContentPlaceHolder1$txtadharno": "123456789012",
    "ctl00$ContentPlaceHolder1$txtownername": "John Doe",
    "ctl00$ContentPlaceHolder1$chkDecarationA": "on"
  };

  render(<UdyamStep2 aadhaarData={aadhaarData} />);

  const btn = screen.getByRole('button', { name: /Validate PAN/i });
  expect(btn).toBeDisabled();

  fireEvent.change(screen.getByPlaceholderText(/Enter PAN Number/i), { target: { value: 'ABCDE1234F' }});
  fireEvent.change(screen.getByPlaceholderText(/Name as per PAN/i), { target: { value: 'John Doe' }});
  fireEvent.change(screen.getByPlaceholderText(/DD\/MM\/YYYY/i), { target: { value: '01/01/2000' }});
  fireEvent.change(screen.getByDisplayValue(/--Select--/i), { target: { value: '1' }});

  // Updated label query to match longer consent text
  fireEvent.click(screen.getByLabelText(/give my consent/i));

  expect(btn).not.toBeDisabled();
});

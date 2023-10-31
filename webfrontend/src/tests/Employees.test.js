import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';  // You may need to mock axios
import Employees from './Employees';

// Mock axios for testing
jest.mock('axios');

// A mock response to simulate the data you expect from your API
const mockData = [
  {
    _id: '1',
    employeeId: 'EMP001',
    employeeName: 'John Doe',
    nic: '12345',
    contactNumber: '555-555-5555',
    category: 'Driver',
    region: 'Region A',
  },
  // Add more data as needed
];

// A mock for the axios.get request
axios.get.mockResolvedValue({ data: mockData });

test('renders the Employees component', async () => {
  render(<Employees />);

  // Ensure that the component is rendered
  expect(screen.getByText('Add Employee')).toBeInTheDocument();

  // You can add more assertions here to validate the initial rendering
});

test('fetches and displays data from the API', async () => {
  render(<Employees />);

  // Simulate an asynchronous operation (API call)
  // Ensure you have mocked the axios.get method as shown above
  // You can also use waitFor if you want to ensure the data is displayed
  await waitFor(() => {
    expect(axios.get).toHaveBeenCalledWith('http://localhost:4000/api/employee', {
      headers: {
        Accept: 'application/json',
      },
    });
    // Assert that data is displayed in the component
    expect(screen.getByText('EMP001')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    // Add more assertions for other data points
  });
});

test('handles form submission', async () => {
  render(<Employees />);

  // Simulate user input and form submission
  const employeeIdInput = screen.getByPlaceholderText('Type employee id');
  const submitButton = screen.getByText('Add new Employee');

  fireEvent.change(employeeIdInput, { target: { value: 'EMP001' } });

  // You can similarly simulate input changes for other fields

  fireEvent.click(submitButton);

  // Ensure that the axios.post method is called with the correct data
  await waitFor(() => {
    expect(axios.post).toHaveBeenCalledWith('http://localhost:4000/api/employee', {
      employeeId: 'EMP001',
      // Include data for other fields
    });
  });
  // Add more assertions for success or error cases after form submission
});

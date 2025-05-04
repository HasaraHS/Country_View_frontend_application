import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import CountriesPage from '../../components/countries/';
import '@testing-library/jest-dom';
import { expect } from '@jest/globals';
import fetchMock from 'jest-fetch-mock';
import { beforeEach, test } from '@jest/globals';

fetchMock.enableMocks();

beforeEach(() => {
  fetch.resetMocks();
  fetch.mockResponseOnce(JSON.stringify([])); // Mock empty country data
});


//unit testing 
// Check if search input and region dropdown are rendered
test('renders search input and region filter', () => {
  render(<CountriesPage />);
  expect(screen.getByPlaceholderText(/search by country name/i)).toBeInTheDocument();
  expect(screen.getByRole('combobox')).toBeInTheDocument();
});


//Check loading message before data loads
test('shows loading message initially', () => {
  render(<CountriesPage />);
  expect(screen.getByText(/loading map/i)).toBeInTheDocument();
});

//Integration testing 
// Mock country fetch and render markers on map
test('renders markers after fetching countries', async () => {
    const mockCountryData = [
        { name: 'United States', region: 'Americas', latlng: [37.0902, -95.7129] },
        { name: 'Canada', region: 'Americas', latlng: [56.1304, -106.3468] }
    ];
    
    fetch.mockResponseOnce(JSON.stringify(mockCountryData));
  
    render(<CountriesPage />);
  
    await waitFor(() => {
      expect(screen.getByText(/united states/i)).toBeInTheDocument();
    });
  });
  

// Simulate search and check suggestions
test('shows suggestions when typing in search box', async () => {
    const mockCountryData = [
        { name: 'United States', region: 'Americas', latlng: [37.0902, -95.7129] },
        { name: 'Canada', region: 'Americas', latlng: [56.1304, -106.3468] }
    ];

    fetch.mockResponseOnce(JSON.stringify(mockCountryData));
  
    render(<CountriesPage />);
  
    const input = screen.getByPlaceholderText(/search by country name/i);
    fireEvent.change(input, { target: { value: 'United' } });
  
    await waitFor(() => {
      expect(screen.getByText(/united states/i)).toBeInTheDocument();
    });
  });
  

  //Select a suggestion and check country detail rendering
  test('displays country details when suggestion is clicked', async () => {
    const mockCountryData = [
        { name: 'United States', region: 'Americas', latlng: [37.0902, -95.7129] },
        { name: 'Canada', region: 'Americas', latlng: [56.1304, -106.3468] }
    ];
    fetch.mockResponseOnce(JSON.stringify(mockCountryData)); // For suggestions
    fetch.mockResponseOnce(JSON.stringify(mockCountryData)); // For alpha fetch
  
    render(<CountriesPage />);
  
    const input = screen.getByPlaceholderText(/search by country name/i);
    fireEvent.change(input, { target: { value: 'United' } });
  
    await waitFor(() => {
      const suggestion = screen.getByText(/united states/i);
      fireEvent.click(suggestion);
    });
  
    await waitFor(() => {
      expect(screen.getByText(/united states of america/i)).toBeInTheDocument();
      expect(screen.getByText(/capital:/i)).toBeInTheDocument();
    });
  });
  



import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../components/Navbar';
import { useSidebarStore } from '../store/sidebarStore';

// Mock the sidebar store
jest.mock('../store/sidebarStore', () => ({
  useSidebarStore: jest.fn(),
}));

describe('Navbar Component', () => {
  const mockToggleSidebar = jest.fn();
  
  beforeEach(() => {
    // Setup the mock implementation
    (useSidebarStore as jest.Mock).mockReturnValue({
      toggleSidebar: mockToggleSidebar,
    });
  });

  it('renders the logo and title', () => {
    render(<Navbar />);
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Navbar />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('calls toggleSidebar when menu button is clicked', () => {
    render(<Navbar />);
    const menuButton = screen.getByLabelText('Toggle menu');
    
    fireEvent.click(menuButton);
    
    expect(mockToggleSidebar).toHaveBeenCalledTimes(1);
  });
});
import { useSidebarStore } from '../store/sidebarStore';

describe('Sidebar Store', () => {
  // Reset the store before each test
  beforeEach(() => {
    useSidebarStore.setState({ isSidebarOpen: false });
  });

  it('should initialize with sidebar closed', () => {
    const { isSidebarOpen } = useSidebarStore.getState();
    expect(isSidebarOpen).toBe(false);
  });

  it('should toggle sidebar state', () => {
    const { toggleSidebar } = useSidebarStore.getState();
    
    // Initial state is false
    expect(useSidebarStore.getState().isSidebarOpen).toBe(false);
    
    // Toggle to true
    toggleSidebar();
    expect(useSidebarStore.getState().isSidebarOpen).toBe(true);
    
    // Toggle back to false
    toggleSidebar();
    expect(useSidebarStore.getState().isSidebarOpen).toBe(false);
  });

  it('should close sidebar', () => {
    const { toggleSidebar, closeSidebar } = useSidebarStore.getState();
    
    // Open the sidebar first
    toggleSidebar();
    expect(useSidebarStore.getState().isSidebarOpen).toBe(true);
    
    // Close the sidebar
    closeSidebar();
    expect(useSidebarStore.getState().isSidebarOpen).toBe(false);
    
    // Calling close when already closed should keep it closed
    closeSidebar();
    expect(useSidebarStore.getState().isSidebarOpen).toBe(false);
  });
});
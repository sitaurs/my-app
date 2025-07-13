import type { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';
import { Toaster } from 'react-hot-toast';
import DarkModeToggle from '@/components/DarkModeToggle';

interface Props {
  children: ReactNode;
}

function DashboardLayout({ children }: Props) {
  return (
    <div data-theme="light" className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 p-4">
        <div className="flex justify-end mb-4">
          <DarkModeToggle />
        </div>
        {children}
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default DashboardLayout;

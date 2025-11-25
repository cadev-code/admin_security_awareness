import React, { JSX } from 'react';
import { SidebarProvider } from '../ui/sidebar';
import { AppSidebar } from '../AppSidebar/AppSidebar';

export const Layout = ({ children }: { children: JSX.Element }) => {
  return (
    <SidebarProvider
      style={{ '--sidebar-width': '12rem' } as React.CSSProperties}
    >
      <AppSidebar />
      <main className="w-full bg-gray-100">{children}</main>
    </SidebarProvider>
  );
};

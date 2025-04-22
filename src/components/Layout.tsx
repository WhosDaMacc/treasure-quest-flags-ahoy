
import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#1A1F2C] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CiAgPHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPgogIDxwYXRoIGQgPSJNMzAgMzBtLTIwIDBhMjAgMjAgMCAxIDAgNDAgMCAyMCAyMCAwIDEgMCAtNDAgMCIgc3Ryb2tlPSIjRjk3MzE2IiBzdHJva2Utb3BhY2l0eT0iMC4xIiBmaWxsPSJub25lIiAvPgo8L3N2Zz4=')] opacity-20" />
      <div className="relative">
        {children}
      </div>
    </div>
  );
};

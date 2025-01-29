'use client';

import React, { useEffect, useState } from 'react';
import { useSidebar } from '../SidebarProvider';

export default function Sidebar({ children }) {
  const [isNarrow, setIsNarrow] = useState(false);

  const { showSidebarState: [isShowSidebar] } = useSidebar();

  const toggleIsNarrow = () => {
    const newValue = !isNarrow;
    localStorage.setItem('isNarrow', newValue ? 'true' : 'false');
    setIsNarrow(newValue);
  };

  // در هنگام بارگذاری اولیه کامپوننت
  useEffect(() => {
    if (localStorage.getItem('isNarrow')) {
      setIsNarrow(localStorage.getItem('isNarrow') === 'true');
    }
  }, []);

  return (
    <div
      className={('sidebar d-flex flex-column position-fixed h-100 border-end', {
        'sidebar-narrow': isNarrow,
        show: isShowSidebar,
      })}
      id="sidebar"
    >
      <div className="sidebar-brand d-none d-md-flex align-items-center justify-content-center">
        <svg className="sidebar-brand-full" width="118" height="46">
          <title>CoreUI Logo</title>
          <use xlinkHref="/assets/brand/coreui.svg#full" />
        </svg>
        <svg className="sidebar-brand-narrow d-none" width="46" height="46">
          <title>CoreUI Logo</title>
          <use xlinkHref="/assets/brand/coreui.svg#signet" />
        </svg>
      </div>

      <div className="sidebar-nav flex-fill border-top">{children}</div>

      <button
        variant="link"
        className="sidebar-toggler d-none d-md-inline-block rounded-0 text-end pe-4 fw-bold shadow-none border-top"
        onClick={toggleIsNarrow}
        type="button"
        aria-label="sidebar toggler"
      >
        icon
      </button>
    </div>
  );
}

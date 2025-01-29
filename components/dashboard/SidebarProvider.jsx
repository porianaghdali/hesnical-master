'use client';

import { createContext, useContext, useMemo, useState } from 'react';

// ایجاد کانتکست برای مدیریت وضعیت سایدبار
export const SidebarContext = createContext({
  showSidebarState: [false, () => {}],
});

export default function SidebarProvider({ children }) {
  const [isShowSidebar, setIsShowSidebar] = useState(false);

  // مقداردهی به کانتکست با استفاده از useMemo برای بهینه‌سازی
  const value = useMemo(() => ({
    showSidebarState: [isShowSidebar, setIsShowSidebar],
  }), [isShowSidebar]);

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
}

// هوک اختصاصی برای استفاده از کانتکست
export const useSidebar = () => {
  const sidebar = useContext(SidebarContext);
  if (!sidebar) {
    throw new Error('useSidebar hook must be used within SidebarProvider');
  }
  return sidebar;
};

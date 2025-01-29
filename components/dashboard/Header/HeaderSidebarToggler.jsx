'use client'

import { useSidebar } from '../SidebarProvider' 

export default function HeaderSidebarToggler() {
  const {
    showSidebarState: [isShowSidebar, setIsShowSidebar],
  } = useSidebar()

  const toggleSidebar = () => {
    setIsShowSidebar(!isShowSidebar)
  }

  return (
    <button
      variant="link"
      className="header-toggler rounded-0 shadow-none"
      type="button"
      onClick={toggleSidebar}
    >
      icon
    </button>
  )
}

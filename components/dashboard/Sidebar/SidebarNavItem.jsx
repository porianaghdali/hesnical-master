'use client'

import React, { PropsWithChildren } from 'react'
import { useSidebar } from '../SidebarProvider'
import { NavItem, NavLink } from 'react-bootstrap'
import Link from 'next/link'

export default function SidebarNavItem(props) {
  const {
    icon,
    children,
    href,
  } = props

  const {
    showSidebarState: [, setIsShowSidebar],
  } = useSidebar()

  return (
    <NavItem>
      <Link href={href} passHref legacyBehavior>
        <NavLink className="px-3 py-2 d-flex align-items-center" onClick={() => setIsShowSidebar(false)}>
          {icon ?"icon"
            : <span className="nav-icon ms-n3" />}
          {children}
        </NavLink>
      </Link>
    </NavItem>
  )
}

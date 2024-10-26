// ** React Imports
import { ReactNode, useContext } from 'react'

// ** Types
import { NavGroup, NavLink } from 'src/@core/layouts/types'

interface Props {
  navGroup?: NavGroup
  children: ReactNode
}

const CanViewNavGroup = (props: Props) => {
  // ** Props
  const { children, navGroup } = props

  const canViewMenuGroup = (item: NavGroup) => {
    const hasAnyVisibleChild =
      !!item.children;

    if (!(item.action && item.subject)) {
      return hasAnyVisibleChild
    }

    // TODO
    return true
  }

  if (navGroup && navGroup.auth === false) {
    return <>{children}</>
  } else {
    return navGroup && canViewMenuGroup(navGroup) ? <>{children}</> : null
  }
}

export default CanViewNavGroup
import { useState } from 'react'

export type SubMenu = {
  id: string
  label: string
  value: string
}

type PageButtonProps = {
  label: string
  active: boolean
  subMenus?: SubMenu[]
  onSubMenuClick?: (value: string) => void
  onClick?: () => void
}

export default function PageButton({
  label,
  active,
  subMenus,
  onSubMenuClick,
  onClick,
}: PageButtonProps) {
  const [expanded, setExpanded] = useState(false)

  const handleMainClick = () => {
    if (subMenus && subMenus.length > 0) {
      setExpanded(!expanded)
      onClick?.()
    } else {
      onClick?.()
    }
  }

  const handleSubMenuClick = (value: string) => {
    onSubMenuClick?.(value)
    setExpanded(false)
  }

  return (
    <div className={`page-button-container`}>
      <button
        className={`page-button${active ? ' active' : ''}`}
        onClick={handleMainClick}
      >
        {label}
        {subMenus && subMenus.length > 0 && <span className={`submenu-arrow`}>▼</span>}
      </button>
      {subMenus && subMenus.length > 0 && expanded && (
        <div className={`submenu`}>
          {subMenus.map((sub) => (
            <button
              key={sub.id}
              className={`submenu-item`}
              onClick={() => handleSubMenuClick(sub.value)}
            >
              {sub.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

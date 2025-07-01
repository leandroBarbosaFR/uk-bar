'use client'
import React, {useState} from 'react'
import '../styles/navDrawer.css'
import {ChevronDown, ChevronUp} from 'lucide-react'

interface NavLink {
  _key: string
  text: string
  blank?: boolean
  internal?: {
    _type: string
    slug: string
  }
  external?: string
  options?: {
    list?: {title: string}[]
  }
  internalLinks?: {_id: string; title: string; slug?: {current: string}}[] | null
}

interface NavDrawerProps {
  links: NavLink[]
  isOpen: boolean
  onCloseAction: () => void
}

export default function NavDrawer({links, isOpen, onCloseAction}: NavDrawerProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  if (!isOpen) return null

  const toggleDropdown = (key: string) => {
    setOpenDropdown((prev) => (prev === key ? null : key))
  }

  return (
    <div className="navDrawerOverlay" onClick={onCloseAction}>
      <nav className="navDrawer" onClick={(e) => e.stopPropagation()}>
        <ul className="navdrawer-links">
          {links.map((link) => {
            const href = link.internal ? `/${link.internal.slug}` : link.external || '#'
            const hasDropdown = link.internalLinks && link.internalLinks.length > 0

            return (
              <li key={link._key} className="navdrawer-links-list">
                {hasDropdown ? (
                  <>
                    <button
                      className="dropdown-toggle flex items-center justify-between w-full text-left"
                      onClick={() => toggleDropdown(link._key)}
                    >
                      <span>{link.options?.list?.[0]?.title || link.text}Our Services</span>
                      {openDropdown === link._key ? (
                        <ChevronUp size={18} />
                      ) : (
                        <ChevronDown size={18} />
                      )}
                    </button>

                    {openDropdown === link._key && (
                      <ul className="dropdown-submenu">
                        {link.internalLinks?.map((internalLink) => {
                          const subHref = internalLink.slug?.current
                            ? `/${internalLink.slug.current}`
                            : '#'
                          return (
                            <li key={internalLink._id}>
                              <a href={subHref} onClick={onCloseAction}>
                                {internalLink.title}
                              </a>
                            </li>
                          )
                        })}
                      </ul>
                    )}
                  </>
                ) : (
                  <a
                    href={href}
                    target={link.blank ? '_blank' : '_self'}
                    rel={link.blank ? 'noopener noreferrer' : undefined}
                    onClick={onCloseAction}
                  >
                    {link.text}
                  </a>
                )}
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

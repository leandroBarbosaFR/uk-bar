'use client'
import React from 'react'
import '../styles/navDrawer.css'

interface NavLink {
  _key: string
  type: 'internal' | 'external'
  anchor: string
  text: string
  blank?: boolean
}

interface NavDrawerProps {
  links: NavLink[]
  isOpen: boolean
  onClose: () => void
}

export default function NavDrawer({links, isOpen, onClose}: NavDrawerProps) {
  if (!isOpen) return null

  return (
    <div className="navDrawerOverlay" onClick={onClose}>
      <nav className="navDrawer" onClick={(e) => e.stopPropagation()}>
        <ul className="navdrawer-links">
          {links.map((link) => (
            <li key={link._key} className=".navdrawer-links-list">
              <a
                href={link.type === 'internal' ? link.anchor : `https://${link.anchor}`}
                target={link.blank ? '_blank' : '_self'}
                rel={link.blank ? 'noopener noreferrer' : undefined}
                onClick={onClose}
              >
                {link.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

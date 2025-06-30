'use client'
import React from 'react'
import '../styles/navDrawer.css'

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
  onClose: () => void
}

export default function NavDrawer({links, isOpen, onClose}: NavDrawerProps) {
  if (!isOpen) return null

  return (
    <div className="navDrawerOverlay" onClick={onClose}>
      <nav className="navDrawer" onClick={(e) => e.stopPropagation()}>
        <ul className="navdrawer-links">
          {links.map((link) => {
            // Conversion des données Sanity vers le format attendu
            const href = link.internal ? `/${link.internal.slug}` : link.external || '#'

            return (
              <li key={link._key} className=".navdrawer-links-list">
                <a
                  href={href}
                  target={link.blank ? '_blank' : '_self'}
                  rel={link.blank ? 'noopener noreferrer' : undefined}
                  onClick={onClose}
                >
                  {link.text}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

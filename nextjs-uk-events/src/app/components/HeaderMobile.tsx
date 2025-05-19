'use client'
import React, {useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import NavDrawer from './NavDrawer'
import Logo from '../../../public/assets/SambaBarLogo.png'
import '../styles/headerMobile.css'

interface NavLink {
  _key: string
  type: 'internal' | 'external'
  anchor: string
  text: string
  blank?: boolean
}

interface HeaderMobileProps {
  links: NavLink[]
}

export default function HeaderMobile({links}: HeaderMobileProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen((prev) => !prev)

  return (
    <header className="headerMobile justify-between">
      {' '}
      <Link href="/">
        <Image src={Logo} alt="Logo" width={60} height={60} />
      </Link>
      <button onClick={toggleMenu} aria-label="Toggle menu" className="burgerButton">
        {isOpen ? (
          // Close (X) Icon SVG
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
            style={{cursor: 'pointer'}}
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          // Burger Menu Icon SVG
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
            style={{cursor: 'pointer'}}
            aria-hidden="true"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        )}
      </button>
      <NavDrawer links={links} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </header>
  )
}

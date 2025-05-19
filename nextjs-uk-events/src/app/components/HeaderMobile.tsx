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
          <span style={{fontSize: '2rem', lineHeight: 1, cursor: 'pointer'}}>&times;</span>
        ) : (
          <span style={{fontSize: '2rem', lineHeight: 1, cursor: 'pointer'}}>&#9776;</span>
        )}
      </button>
      <NavDrawer links={links} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </header>
  )
}

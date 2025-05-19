'use client'
import React, {useState, useEffect} from 'react'
import {useScroll} from '@/hooks/useScroll'
import {client} from '@/sanity/client'
import Link from 'next/link'
import Image from 'next/image'
import Logo from '../../../public/assets/SambaBarLogo.png'
import {type SanityDocument} from 'next-sanity'
import '../styles/header.css'

interface NavLink {
  _key: string
  type: 'internal' | 'external'
  anchor: string
  text: string
  blank?: boolean
}

const LINK_QUERY = `*[_type == "header"][0] {
  links[] {
    _key,
    text,
    type,
    anchor,
    blank
  },
  title
}`

const logo = Logo
const options = {next: {revalidate: 30}}

export default function Header() {
  const isScrolled = useScroll()

  const [nav, setNav] = useState<SanityDocument | null>(null)

  useEffect(() => {
    client.fetch<SanityDocument>(LINK_QUERY, {}, options).then(setNav)
  }, [])

  if (!nav) return null

  return (
    <header className="header">
      <div className={`headerContainer ${isScrolled ? 'scrolled' : ''}`}>
        <Link href="/">
          <Image src={logo} alt="Hero image" width={80} height={80} />
        </Link>
        <nav className="flex gap-6">
          {nav.links?.map((link: NavLink) => (
            <a
              key={link._key}
              href={link.type === 'internal' ? link.anchor : `https://${link.anchor}`}
              target={link.blank ? '_blank' : '_self'}
              rel={link.blank ? 'noopener noreferrer' : undefined}
              className="navLink"
            >
              {link.text}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}

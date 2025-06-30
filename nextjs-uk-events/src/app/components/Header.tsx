'use client'

import React, {useState, useEffect} from 'react'
import {useScroll} from '@/hooks/useScroll'
import {client} from '@/sanity/client'
import Link from 'next/link'
import Image from 'next/image'
import Logo from '../../../public/assets/SambaBarLogo.png' // ✅ Import statique obligatoire
import {type SanityDocument} from 'next-sanity'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import '../styles/header.css'
import HeaderMobile from '../components/HeaderMobile'
import {ChevronDown} from 'lucide-react'

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

const LINK_QUERY = `*[_type == "header"][0] {
  links[] {
    _key,
    text,
    blank,
    internal->{
      _type,
      "slug": slug.current
    },
    external,
    options {
      list[] {
        title
      }
    },
    internalLinks[]->{
      _id,
      title,
      slug
    }
  },
  title
}`

const options = {next: {revalidate: 30}}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  return isMobile
}

export default function Header() {
  const isScrolled = useScroll()
  const isMobile = useIsMobile()
  const [nav, setNav] = useState<SanityDocument | null>(null)

  useEffect(() => {
    client
      .fetch<SanityDocument>(LINK_QUERY, {}, options)
      .then((data) => {
        setNav(data)
      })
      .catch((error) => {
        console.error('❌ Error fetching navigation data:', error)
      })
  }, [])

  if (!nav) return null

  if (isMobile) {
    return <HeaderMobile links={nav.links} />
  }

  return (
    <header className="header">
      <div className={`headerContainer ${isScrolled ? 'scrolled' : ''}`}>
        <Link href="/" className="flex items-center">
          <Image
            src={Logo}
            alt="Samba Bar Logo"
            width={80}
            height={80}
            priority
            fetchPriority="high"
            sizes="80px"
          />
        </Link>

        <nav className="nav-links flex gap-2">
          {nav.links?.map((link: NavLink) => {
            const href = link.internal ? `/${link.internal.slug}` : link.external || '#'

            if (link.internalLinks && link.internalLinks.length > 0) {
              const dropdownTitle = link.options?.list?.[0]?.title || link.text

              return (
                <DropdownMenu key={link._key}>
                  <DropdownMenuTrigger asChild>
                    <button className="navLink dropdown-trigger flex">
                      {dropdownTitle} <ChevronDown />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="dropdown-content">
                    {link.internalLinks.map((internalLink) => {
                      if (!internalLink._id) return null
                      const internalHref = internalLink.slug?.current
                        ? `/${internalLink.slug.current}`
                        : '#'
                      return (
                        <DropdownMenuItem key={internalLink._id} asChild>
                          <Link href={internalHref} className="dropdown-item cursor-pointer">
                            {internalLink.title}
                          </Link>
                        </DropdownMenuItem>
                      )
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
              )
            }

            return (
              <Link
                key={link._key}
                href={href}
                target={link.blank ? '_blank' : '_self'}
                rel={link.blank ? 'noopener noreferrer' : undefined}
                className="navLink"
              >
                {link.text}
              </Link>
            )
          })}
        </nav>

        <div className="contact-button-wrapper">
          <Link href="/contact" className="contact-button">
            Contact
          </Link>
        </div>
      </div>
    </header>
  )
}

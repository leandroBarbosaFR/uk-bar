import {type SanityDocument} from 'next-sanity'
import {client} from '@/sanity/client'
import Link from 'next/link'
import '../styles/footer.css'
import LogoSvg from '../components/LogoSvg'

interface NavLink {
  _key: string
  text: string
  blank?: boolean
  internal?: {
    _type: string
    slug: string
  }
  external?: string
}

const LINK_QUERY = `*[_type == "footer"][0] {
  links[] {
    _key,
    text,
    blank,
    internal->{
      _type,
      "slug": slug.current
    },
    external
  },
  title
}`

const options = {next: {revalidate: 30}}

export default async function Footer() {
  const nav = await client.fetch<SanityDocument>(LINK_QUERY, {}, options)

  return (
    <>
      <footer className="footer">
        <div className="footerContainer grid grid-cols-12">
          <div className="footer-nav">
            {nav?.links?.length ? (
              nav.links.map((link: NavLink) => {
                const href = link.internal ? `/${link.internal.slug}` : link.external || '#'
                return (
                  <Link
                    key={link._key}
                    href={href}
                    target={link.blank ? '_blank' : '_self'}
                    rel={link.blank ? 'noopener noreferrer' : undefined}
                    className="navLink-footer"
                  >
                    {link.text}
                  </Link>
                )
              })
            ) : (
              <p className="col-span-12 text-center">No footer links available.</p>
            )}
          </div>

          {/* <h1 className="footer-title col-span-12 row-start-3">SAMBA BAR EVENTS</h1> */}
          <div
            className="flex justify-center row-start-4"
            style={{gridColumn: '2/12', gridRow: '2'}}
          >
            <LogoSvg />
          </div>
          <div className="footer-links">
            <span>
              © {new Date().getFullYear()} Samba Bar Events. All rights reserved | Designed and
              built by{' '}
              <a href="https://www.1367studio.com" target="_blank">
                1367 Studio
              </a>
              .
            </span>
          </div>
        </div>
      </footer>
    </>
  )
}

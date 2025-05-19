import {type SanityDocument} from 'next-sanity'
import {client} from '@/sanity/client'
import '../styles/footer.css'

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

const options = {next: {revalidate: 30}}

export default async function Footer() {
  const nav = await client.fetch<SanityDocument>(LINK_QUERY, {}, options)

  return (
    <>
      <footer className="footer">
        <div className="footerContainer grid grid-cols-12">
          {/* <Link href="/">
            <Image src={logo} alt="Hero image" width={80} height={80} />
          </Link> */}
          <nav className="flex gap-6 col-span-6 row-start-2">
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
          <h1 className="footer-title col-span-12 row-start-3">Samba Bar Events</h1>
          <div
            className="col-span-12 row-start-4"
            style={{borderBottom: ' .5px solid #33483e', width: '90%', margin: '0 auto'}}
          ></div>
        </div>
      </footer>
    </>
  )
}

'use client'
import React, {useEffect, useState} from 'react'
import ContactForm from '../components/ContactForm'
import '../styles/contact.css'
import {PortableText} from '@portabletext/react'
import type {PortableTextBlock} from '@portabletext/types'
import {client} from '@/sanity/client'
import {UserPlus, Phone, Mail} from 'lucide-react'
import Link from 'next/link'

const CONTACT_QUERY = `*[_type == "contactPage"][0]{
  title,
  body,
  emailLabel,
  email,
  phoneLabel,
  phone,
  addressLabel,
  address,
  infosTitle
}`

export default function Contact() {
  type ContactPage = {
    title?: string
    body: string | PortableTextBlock[]
    emailLabel?: string
    email?: string
    phoneLabel?: string
    phone?: string
    addressLabel?: string
    address?: string
    infosTitle?: string
  }

  const [contactData, setContactData] = useState<ContactPage | null>(null)

  useEffect(() => {
    async function fetchContact() {
      const data = await client.fetch(CONTACT_QUERY)
      setContactData(data)
    }
    fetchContact()
  }, [])

  if (!contactData) return null

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-[#f1f0e7] main-contact-page">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#33483e]">
              {contactData.title || 'Contact Us'}
            </h1>
            {contactData.body && typeof contactData.body !== 'string' ? (
              <PortableText value={contactData.body} />
            ) : (
              <p>{contactData.body}</p>
            )}
          </div>

          <div className="bg-[#33483e] p-6 md:p-8 rounded-xl">
            <ContactForm />
          </div>
          <div className="w-full flex justify-center">
            <h1 className="text-xl mt-8 sm:text-2xl md:text-4xl lg:text-5xl font-bold text-center w-full">
              {contactData.infosTitle || 'How to Reach Us:'}
            </h1>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-transparent p-6 text-left flex justify-center md:justify-start">
              <Link href="/" className="font-medium text-lg flex-col mb-2 flex items-center gap-2">
                <UserPlus />
                {contactData.addressLabel || 'Visit Us'}
                <p className="text-gray-600">{contactData.address}</p>
              </Link>
            </div>

            <div className="bg-transparent p-6 text-left flex justify-center md:justify-start">
              <Link
                href="tel:+4407731389038"
                className="font-medium text-lg flex-col mb-2 flex items-center gap-2"
              >
                <Phone />
                {contactData.phoneLabel || 'Call Us'}
                <p className="text-gray-600">{contactData.phone}</p>
              </Link>
            </div>

            <div className="bg-transparent p-6 text-left flex justify-center md:justify-start">
              <Link
                href="mailto:info@sambabarevents.co.uk"
                className="font-medium text-lg flex-col mb-2 flex items-center gap-2"
              >
                <Mail />
                {contactData.emailLabel || 'Email Us'}
                <p className="text-gray-600">{contactData.email}</p>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

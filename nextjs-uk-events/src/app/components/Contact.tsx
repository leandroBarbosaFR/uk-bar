'use client'
import React, {useEffect, useState} from 'react'
import ContactForm from '../components/ContactForm'
import '../styles/contact.css'
import {PortableText} from '@portabletext/react'
import type {PortableTextBlock} from '@portabletext/types'
import {client} from '@/sanity/client'

const CONTACT_QUERY = `*[_type == "contactPage"][0]{
  title,
  body,
  emailLabel,
  email,
  phoneLabel,
  phone,
  addressLabel,
  address
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
      <main className="flex-grow bg-[transparent] main-contact-page">
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

          <div className="bg-[#33483e] p-6 md:p-8">
            <ContactForm />
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-[transparent] p-6 ">
              <h3 className="font-medium text-lg mb-2">{contactData.addressLabel || 'Visit Us'}</h3>

              <p className="text-gray-600">{contactData.address}</p>
            </div>

            <div className="bg-[transparent] p-6">
              <h3 className="font-medium text-lg mb-2">{contactData.phoneLabel || 'Call Us'}</h3>
              <p className="text-gray-600">{contactData.phone}</p>
            </div>

            <div className="bg-[transparent] p-6">
              <h3 className="font-medium text-lg mb-2">{contactData.emailLabel || 'Email Us'}</h3>
              <p className="text-gray-600">{contactData.email}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

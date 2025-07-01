'use client'

import React, {useEffect, useState} from 'react'
import {PortableText} from '@portabletext/react'
import type {PortableTextBlock} from '@portabletext/types'
import {client} from '@/sanity/client'

import '../styles/TermsAndConditionsPage.css'

const TermsAndConditionsPage_QUERY = `*[_type == "termsAndConditionsPage"][0]{ _id, title, subtitle, body }`

export default function TermsAndConditionsPage() {
  interface TermsAndConditionsPageData {
    title: string
    subtitle: string
    body: PortableTextBlock[]
  }
  const [TermsAndConditionsPage, setTermsAndConditionsPage] =
    useState<TermsAndConditionsPageData | null>(null)

  useEffect(() => {
    // Fetch data client-side
    async function fetchTermsAndConditionsPage() {
      const data = await client.fetch(TermsAndConditionsPage_QUERY)
      setTermsAndConditionsPage(data)
    }
    fetchTermsAndConditionsPage()
  }, [])

  if (!TermsAndConditionsPage) return null // or show a loader, placeholder, etc.

  return (
    <section className="main-terms-page">
      <div className="grid grid-cols-12 gap-8 px-4">
        <h1 className="col-span-12 text-4xl sm:text-7xl text-center text-[#33483e] font-bold">
          {TermsAndConditionsPage.title}
        </h1>

        <h3 className="col-span-12 text-[#33483e] font-bold text-center text-xl sm:text-4xl">
          {TermsAndConditionsPage.subtitle}
        </h3>

        <div className="col-span-12 lg:col-start-2 lg:col-end-12 text-[#33483e] text-lg item-description">
          <PortableText value={TermsAndConditionsPage.body} />
        </div>
      </div>
    </section>
  )
}

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
  const [TermsAndConditionsPage, setTermsAndConditionsPage] = useState<TermsAndConditionsPageData | null>(
    null,
  )

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
      <div className="gap-8 grid-container-terms">
        <h1
          className=" terms-title-terms text-4xl sm:text-7xl text-center text-[#33483e] md:text-5xl lg:text-[90px] font-bold "
         
        >
          {TermsAndConditionsPage.title}
        </h1>
        <h3
          className=" terms-subtitle-terms text-[#33483e] font-bold text-center  text-1xl sm:text-4xl md:text-4xl lg:text-[24px] whitespace-normal sm:whitespace-nowrap"
     
        >
          {TermsAndConditionsPage.subtitle}
        </h3>
        <div className="terms-body-terms text-[#33483e] text-1xl sm:text-4xl md:text-4xl lg:text-[24px]">
          <PortableText value={TermsAndConditionsPage.body} />
        </div>
      </div>
    </section>
  )
}

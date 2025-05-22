'use client'

import React, {useEffect, useState} from 'react'
import {PortableText} from '@portabletext/react'
import type {PortableTextBlock} from '@portabletext/types'
import {client} from '@/sanity/client'

import '../styles/PrivacyPolicyPage.css'

const PrivacyPolicyPage_QUERY = `*[_type == "privacyPolicyPage"][0]{ _id, title, subtitle, body }`

export default function PrivacyPolicyPage() {
  interface PrivacyPolicyPageData {
    title: string
    subtitle: string
    body: PortableTextBlock[]
  }
  const [PrivacyPolicyPage, setPrivacyPolicyPage] = useState<PrivacyPolicyPageData | null>(
    null,
  )

  useEffect(() => {
    // Fetch data client-side
    async function fetchPrivacyPolicyPage() {
      const data = await client.fetch(PrivacyPolicyPage_QUERY)
      setPrivacyPolicyPage(data)
    }
    fetchPrivacyPolicyPage()
  }, [])

  if (!PrivacyPolicyPage) return null // or show a loader, placeholder, etc.

  return (
    <section className="main-terms-page">
      <div className="gap-8 grid-container-privacy">
        <h1
          className=" terms-title-privacy text-4xl sm:text-7xl text-center text-[#33483e] md:text-5xl lg:text-[90px] font-bold "
         
        >
          {PrivacyPolicyPage.title}
        </h1>
        <h3
          className=" terms-subtitle-privacy text-[#33483e] font-bold text-center  text-1xl sm:text-4xl md:text-4xl lg:text-[24px] whitespace-normal sm:whitespace-nowrap"
     
        >
          {PrivacyPolicyPage.subtitle}
        </h3>
        <div className="terms-body-privacy text-[#33483e] text-1xl sm:text-4xl md:text-4xl lg:text-[24px]">
          <PortableText value={PrivacyPolicyPage.body} />
        </div>
      </div>
    </section>
  )
}

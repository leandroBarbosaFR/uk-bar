'use client'

import React, {useEffect, useState} from 'react'
import {PortableText} from '@portabletext/react'
import type {PortableTextBlock} from '@portabletext/types'
import {client} from '@/sanity/client'
import '../styles/PrivacyPolicyPage.css'

const PRIVACY_POLICY_QUERY = `*[_type == "privacyPolicyPage"][0]{ _id, title, subtitle, body }`

interface PrivacyPolicyPageData {
  title: string
  subtitle: string
  body: PortableTextBlock[]
}

export default function PrivacyPolicyPage() {
  const [privacyPolicy, setPrivacyPolicy] = useState<PrivacyPolicyPageData | null>(null)

  useEffect(() => {
    async function fetchData() {
      const data = await client.fetch(PRIVACY_POLICY_QUERY)
      setPrivacyPolicy(data)
    }
    fetchData()
  }, [])

  if (!privacyPolicy) return null

  return (
    <section className="main-privacy-page">
      <div className="grid grid-cols-12 gap-8 px-4">
        <h1 className="col-span-12 text-4xl sm:text-7xl text-center text-[#33483e] font-bold">
          {privacyPolicy.title}
        </h1>
        <h3 className="col-span-12 text-[#33483e] font-bold text-center text-xl sm:text-4xl">
          {privacyPolicy.subtitle}
        </h3>
        <div className="col-span-12 lg:col-start-2 lg:col-end-12 text-[#33483e] text-lg item-description">
          <PortableText value={privacyPolicy.body} />
        </div>
      </div>
    </section>
  )
}

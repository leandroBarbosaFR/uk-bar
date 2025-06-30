import React from 'react'
import Image from 'next/image'
import {urlFor} from '../../lib/sanityImage'
import {
  PortableText,
  type PortableTextReactComponents,
  type PortableTextComponentProps,
} from '@portabletext/react'
import type {PortableTextBlock} from '@portabletext/types'

const portableTextComponents: Partial<PortableTextReactComponents> = {
  block: {
    h1: ({children}: PortableTextComponentProps<PortableTextBlock>) => (
      <h1 className="text-4xl font-bold my-4">{children}</h1>
    ),
    h2: ({children}: PortableTextComponentProps<PortableTextBlock>) => (
      <h2 className="text-3xl font-semibold my-3">{children}</h2>
    ),
    h3: ({children}: PortableTextComponentProps<PortableTextBlock>) => (
      <h3 className="text-2xl font-medium my-2">{children}</h3>
    ),
    normal: ({children}: PortableTextComponentProps<PortableTextBlock>) => (
      <p className="my-2">{children}</p>
    ),
  },
  list: {
    bullet: ({children}) => <ul className="list-disc list-inside mb-4">{children}</ul>,
    number: ({children}) => <ol className="list-decimal list-inside mb-4">{children}</ol>,
  },
  listItem: {
    bullet: ({children}) => <li className="mb-1">{children}</li>,
    number: ({children}) => <li className="mb-1">{children}</li>,
  },
  types: {
    image: ({value}) => {
      if (!value?.asset?._ref) return null
      return (
        <div className="my-6 flex justify-center">
          <Image
            src={urlFor(value).width(800).height(500).url()} // Define both width and height
            alt={value.alt || 'Image'}
            width={800} // Setting width
            height={500} // Setting height
            className="rounded-lg"
          />
        </div>
      )
    },
  },
}

type Props = {
  value: PortableTextBlock[]
}

export default function PortableTextRenderer({value}: Props) {
  return <PortableText value={value} components={portableTextComponents} />
}

import React from 'react'
import Image from 'next/image'
import GlassSvg from '../../../public/assets/glassSvg.svg'

function parseSize(size: string | number | undefined): number | undefined {
  if (typeof size === 'number') return size
  if (typeof size === 'string') {
    const num = parseInt(size, 10)
    if (!isNaN(num)) return num
  }
  return undefined
}

const GlassSvgWrapper = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    const width = parseSize(props.style?.width)
    const height = parseSize(props.style?.height)

    return (
      <div ref={ref} {...props} style={{ display: 'inline-block', ...props.style }}>
        <Image
          src={GlassSvg}
          alt="Glass"
          width={width || 80}
          height={height || 80}
        />
      </div>
    )
  }
)

GlassSvgWrapper.displayName = 'GlassSvgWrapper'

export default GlassSvgWrapper

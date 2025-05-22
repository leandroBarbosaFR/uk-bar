import Image from 'next/image'
import IceSvg from '../../../public/assets/iceSvg.svg'

export default function IceSvgWrapper(props: React.HTMLAttributes<HTMLImageElement> & { 'data-ingredient'?: string; width?: number; height?: number }) {
  return <Image
        src={IceSvg}
        alt="Ice"
        width={props.width || 80}
        height={props.height || 80}
        {...props}
      />
}

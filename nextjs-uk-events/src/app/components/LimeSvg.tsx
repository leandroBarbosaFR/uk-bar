import Image from 'next/image'
import LimeSvg from '../../../public/assets/limeSvg.svg'

export default function LimeSvgWrapper(props: React.HTMLAttributes<HTMLImageElement> & { 'data-ingredient'?: string; width?: number; height?: number }) {
  return <Image
      src={LimeSvg}
      alt="Lime"
      width={props.width || 80}
      height={props.height || 80}
      {...props}
    />
}

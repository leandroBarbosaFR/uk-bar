import Image from 'next/image'
import SugarSvg from '../../../public/assets/sugarSvg.svg'

export default function SugarSvgWrapper(props: React.HTMLAttributes<HTMLImageElement> & { 'data-ingredient'?: string; width?: number; height?: number }) {
  return <Image
        src={SugarSvg}
        alt="Sugar"
        width={props.width || 80}
        height={props.height || 80}
        {...props}
      />
}

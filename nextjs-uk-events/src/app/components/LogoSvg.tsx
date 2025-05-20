import Image from 'next/image'
import sambaBar from '../../../public/assets/SAMBA_BAR_EVENTS.svg'

export default function LogoSvg() {
  return <Image src={sambaBar} alt="Logo" />
}

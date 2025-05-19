import {useEffect, useState} from 'react'

export function useScroll(threshold = 10) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > threshold)
    }

    window.addEventListener('scroll', onScroll)
    onScroll() // call initially

    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return isScrolled
}

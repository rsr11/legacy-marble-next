
import React from 'react'
import Link from 'next/link'
import Image from 'next/image';

const Logo = () => {
  return (
      <Link href={'/'}>
    <div className='z-10 relative text-white font-nippo  items-center flex' >
      <Image src="/images/legacy-marble-logo.png" height={100} width={100} className='object-contain cursor-pointer h-12' alt="Legacy Marble Logo" />
      <section className=''>
      <p className='leading-6  text-lg bg-clip-text text-transparent bg-gradient-to-r from-[#D9D9D9] to-[#E39E1D]' >LEGACY <br /> MARBLE</p>
      {/* <h2 className='font-bol text-lg' >MARBLE</h2> */}
      </section>
    </div>
      </Link>
  )
}

export default Logo

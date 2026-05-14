// 'use client';

// import React from 'react'

import Footer from "../components/Footer"
import Loader from "../components/Loader"
import Category from "../sections/Category"
import HeroSection from "../sections/HeroSection"
import { HoverImageLinks } from "../sections/HoverImageLink"
import OurTeam from "../sections/OurTeam"

const HomePage = () => {
  return (
    <main>
      <Loader/>
      <HeroSection/>
      <Category/>
      <HoverImageLinks/>
      <OurTeam/>
      <Footer/>
    </main>
  )
}

export default HomePage

import React from 'react'
import Banner from './Banner'
import Categories from './Categories'
import HeroSection from './HeroSection'

import TrendingProduct from '../shop/TrendingProduct'
import DealsSection from './DealsSection'
import PromoBanner from './PromoBanner'
import Blogs from '../blogs/Blogs'


const Home = () => {
  return (
    <>
          
          <Banner />
      <Categories />
      <HeroSection />
      <TrendingProduct />
      <DealsSection />
      <PromoBanner />
      <Blogs />
     
      
    </>
  )
}

export default Home

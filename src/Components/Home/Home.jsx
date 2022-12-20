import React from 'react'
import Featured from '../Featured'
import FeaturedProperties from '../FeaturedProperties'
import Footer from '../Footer'
import Header from '../Header'
import MailList from '../MailList'
import Navbar from '../Navbar'
import PropertyList from '../PropertyList'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Header/>
      <div className='homecontainer'>
        <Featured/>
        <h1 className='homeTitle'>Browse by property type</h1>
        <PropertyList/>
        <h1 className='homeTitle'>Home guest love</h1>
        <FeaturedProperties/>
        <MailList/>
        <Footer/>
      </div>
    </div>
  )
}

export default Home

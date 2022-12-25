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
        <h1 className='homeTitle'>Explore India</h1>
        <h2 className='homeTitle'>These popular destinations have a lot to offer</h2>
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

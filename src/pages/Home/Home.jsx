import React from 'react'
import Featured from '../../Components/Featured/Featured'
import FeaturedProperties from '../../Components/FeaturedProperties/FeaturedProperties'
import Footer from '../../Components/Footer/Footer'
import Header from '../../Components/Header/Header'
import MailList from '../../Components/MailList/MailList'
import Navbar from '../../Components/Navbar/Navbar'
import PropertyList from '../../Components/PropertyList/PropertyList'

import "./home.scss"

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Header/>
      <div className='homecontainer'>
        <h1 className='homeTitle'>Explore India</h1>
        <h2 className='homeTitle2'>These popular destinations have a lot to offer</h2>
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

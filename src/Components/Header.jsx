import React, { useContext } from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBed, faPlane, faTaxi, faCar} from '@fortawesome/free-solid-svg-icons'
import Searchbar from './Searchbar'
import { AuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom'

const Header = ({type}) => {
    const {user} = useContext(AuthContext);
  return (
    
    <div className='header'>
        <div className={type==='list' ? 'headerContainer listMode' : "headerContainer"}>
            <div className='headerList'>
                <div className='headerListItem stays'>
                    <FontAwesomeIcon icon={faBed} />
                    <span>Stays</span>
                </div>
                <div className='headerListItem'>
                    <FontAwesomeIcon icon={faPlane} />
                    <span>Flights</span>
                </div>
                <div className='headerListItem'>
                    <FontAwesomeIcon icon={faCar} />
                    <span>Car rentals</span>
                </div>
                <div className='headerListItem'>
                    <FontAwesomeIcon icon={faBed} />
                    <span>Attractions</span>
                </div>
                <div className='headerListItem'>
                    <FontAwesomeIcon icon={faTaxi} />
                    <span>Airport taxis</span>
                </div>
            </div>{
                type!=="list" &&
           
                <>
                <h1 className='headerTitle'>Find your next stay</h1>
                
                <p className='headerDesc'>Search low prices on hotels, homes and much more...</p>
                
                {!user && <Link to={"/login"}><button className='headerBtn'>Sign in / Register</button></Link>}
            </>
        }
        </div>
        {type!=="list" && <Searchbar/>}
    </div>
  )
}

export default Header


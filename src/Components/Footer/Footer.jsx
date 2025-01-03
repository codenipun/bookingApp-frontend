import React from 'react'
import "./footer.scss"
import { Tooltip } from 'antd';
import myPic from '../../Images/Picsart_24-07-30_10-29-21-941.jpg'
import { GithubOutlined, InstagramOutlined, LinkedinOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Footer = () => {
  const tooltipContent = (
    <div className="tooltipContent">
      <div className="tooltipHeader">
        <img
          src={myPic} // Replace with the person's image URL
          alt="person"
          className="tooltipImage"
        />
        <div>
          <div className="tooltipName">Nipun Jain</div>
          <div className="tooltipDesignation">Software Engineer-1</div>
          <div className="tooltipDesignation">eSec Forte Technologies</div>
        </div>
      </div>
      <div className="tooltipDescription">
        Passionate about building scalable web applications and exploring new technologies.
      </div>
      <div style={{display: 'flex', gap: '10px'}}>
        <Link style={{color: 'white'}} to={'https://linkedin.com/in/nipun18'} target='_blank'><LinkedinOutlined /></Link>
        <Link style={{color: 'white'}} to={'https://github.com/codenipun'} target='_blank'><GithubOutlined /></Link>
      </div>
    </div>
  );
  
  return (
    <div className="footer">
      <div className="fLists">
        <ul className="fList">
          <li className="fListItem">Countries</li>
          <li className="fListItem">Regions</li>
          <li className="fListItem">Cities</li>
          <li className="fListItem">Districts</li>
          <li className="fListItem">Airports</li>
          <li className="fListItem">Hotels</li>
        </ul>
        <ul className="fList">
          <li className="fListItem">Homes </li>
          <li className="fListItem">Apartments </li>
          <li className="fListItem">Resorts </li>
          <li className="fListItem">Villas</li>
          <li className="fListItem">Hostels</li>
          <li className="fListItem">Guest houses</li>
        </ul>
        <ul className="fList">
          <li className="fListItem">Unique places to stay </li>
          <li className="fListItem">Reviews</li>
          <li className="fListItem">Unpacked: Travel articles </li>
          <li className="fListItem">Travel communities </li>
          <li className="fListItem">Seasonal and holiday deals </li>
        </ul>
        <ul className="fList">
          <li className="fListItem">Car rental </li>
          <li className="fListItem">Flight Finder</li>
          <li className="fListItem">Restaurant reservations </li>
          <li className="fListItem">Travel Agents </li>
        </ul>
        <ul className="fList">
          <li className="fListItem">Curtomer Service</li>
          <li className="fListItem">Partner Help</li>
          <li className="fListItem">Careers</li>
          <li className="fListItem">Sustainability</li>
          <li className="fListItem">Press center</li>
          <li className="fListItem">Safety Resource Center</li>
          <li className="fListItem">Investor relations</li>
          <li className="fListItem">Terms & conditions</li>
        </ul>
      </div>
      <div className="fText">Made with ❤️ by &nbsp; 
        <Tooltip placement="top" title={tooltipContent} overlayClassName="customTooltip">
          <a className="gitName" href="https://www.github.com/codenipun">
            codenipun
          </a>
        </Tooltip>
      </div>
    </div>
  )
}

export default Footer

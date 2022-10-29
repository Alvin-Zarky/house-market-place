import React from 'react';
import { NavLink } from 'react-router-dom';
import {BsCompass} from 'react-icons/bs';
import {GiTicket} from 'react-icons/gi';
import {HiUser} from "react-icons/hi";
import * as Routes from "../../routes";
import './bottom-menu.scss';

export default function BottomMenu() {
  return (
    <>
      <div style={{
        marginTop:"130px"
      }}>
        <nav className='nav-bottom'>
          <ul>
            <li>
              <NavLink exact to={Routes.HOME}><div><BsCompass /></div> Explore</NavLink>
            </li>
            <li>
              <NavLink to={Routes.OFFER}><div><GiTicket /></div> Offer</NavLink>
            </li>
            <li><NavLink to={Routes.PROFILE}><div><HiUser /></div> Profile</NavLink></li>
          </ul>
        </nav>
      </div>
    </>
  );
}

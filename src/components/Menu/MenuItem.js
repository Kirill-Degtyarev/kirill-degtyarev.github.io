import React from 'react';
import { NavLink } from 'react-router-dom';

import SvgGenerator from '../../svgGenerator/SvgGenerator';

import './MenuItem.scss';

const MenuItem = (props) => {
  return (
    <li className="menu-item">
      <NavLink
        to={props.path}
        className={({ isActive }) =>
          isActive ? 'menu-item__link active-link' : 'menu-item__link'
        }
      >
        <div
          className={`${
            props.mobileMenu ? 'menu-item__info item-info' : 'menu-item__info'
          }`}
        >
          <div className={`${'item-info__img'} ${props.img_class}`}>
            <SvgGenerator id={props.img_id} />
          </div>
          <div className="item-info__text">{props.text}</div>
        </div>
      </NavLink>
    </li>
  );
};

export default MenuItem;

import React from 'react'

function Header (){

    return <div className="top-bar">
              <div className="top-bar-left">
                <ul className="dropdown menu" data-dropdown-menu>
                  <li className="menu-text">
                    <img src={'/logo.svg'} className={'mr-1'} width={50} alt={'My Best Portfolio logo'}></img>
                    My Best Portfolio
                  </li>
                </ul>
              </div>
            </div>
}

export default Header;
import React from 'react';
import './navbar.css';

export const Navbar = () => {
   return (
      <div className='navbar navbar-dark bg-dark mb-4'>
         <span className='navbar-brand'>Jeral</span>

         <button className='btn btn-outline-light'>
            <i className='fas fa-sign-out-alt'></i>
            <span> Salir</span>
         </button>
      </div>
   );
};

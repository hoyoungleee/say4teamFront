import React from 'react'
import './LogoutCart.css';

const LogoutCart = () => {
  return (
    <div>
        <div className='topLogouttitle'>
            <p>Your cart</p>
        </div>
        <hr/>
        <div className='middleLogouttitle'>
            <p>Your cart is empty</p>
        </div>
        <hr/>
        <div className='bottonbutton'>
            <button>Continue shopping on say touchė</button>
        </div>
    </div>
  )
}

export default LogoutCart
import React from 'react'
import './Press.css';
import press1 from './../assets/press1.jpg'
import press2 from './../assets/press2.jpg'
import press3 from './../assets/press3.jpg'
import press4 from './../assets/press4.jpg'
import press5 from './../assets/press5.jpg'
import press6 from './../assets/press6.jpg'
import press7 from './../assets/press7.jpg'
import press8 from './../assets/press8.jpg'


const Press = () => {
  return (
    <div className='pressContainer'>
        <div>
          <img src={press1} />
          <p>Marie Claire 23 FFB</p>
        </div>
        <div>
          <img src={press2}/>
          <p>BAZAAR 22 JULY</p>
        </div>
        <div>
          <img src={press3}/>
          <p>ELLE 22 APR</p>
        </div>
        <div>
          <img src={press4}/>
          <p>Noblesse 22 FFB</p>
        </div>
        <div>
          <img src={press5}/>
          <p>Y Magazine 22 FFB</p>
        </div>
        <div>
          <img src={press6}/>
          <p>W Korea 21 DEC</p>
        </div>
        <div>
          <img src={press7}/>
          <p>Living Sense 21 JUN</p>
        </div>
        <div>
          <img src={press8}/>
          <p>Noblesse 21 APR</p>
        </div>
    </div>
  )
}

export default Press
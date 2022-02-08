import React from 'react';
import './Loading.scss';

const CupOfCoffee = () => {
  return (
    <div className='main-loading'>
      <div className='loading-overlay'></div>
      <div className='full-cup'>
        <div className='plate'></div>
        <div className='handle'></div>

        <div className='cup'>
          <div className='top'>
            <div className='vapour'>
              {Array.from(Array(20).keys()).map((item: number) => (
                <span
                  key={item}
                  style={{ animationDelay: `${1.5 * Math.random()}s` }}></span>
              ))}
            </div>

            <div className='circle'>
              <div className='coffee'></div>
            </div>
            <div
              className='logo'
              style={{ backgroundImage: './img/logo1.png' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CupOfCoffee;

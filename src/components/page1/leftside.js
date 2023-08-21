import React from 'react';
import Sideimg from '../Images/image 13.png';

function leftSide() {
  return (
    <div className="side--img--div">
      <img src={Sideimg} alt="Sideimg" />
      <p>Discover new things on Superapp</p>
    </div>
  );
}
export default leftSide;

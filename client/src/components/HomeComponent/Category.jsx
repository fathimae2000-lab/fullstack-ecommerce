import React from 'react'; 
import men from '../../assets/images/men.png';
import girl from '../../assets/images/girl.png';
import gents from '../../assets/images/gents.png';
import menImg from '../../assets/images/dumbell.png';
import './Categroy.scss';

function Category() {
  return (
    <div className='category container'>
      <h2>BROWSE BY DRESS STYLE</h2>  

      {/* First Row */}
      <div className="row">
        <div className='col-12 col-sm-6 col-lg-5 category-item'>
          <img className='casual img-fluid' src={men} alt="men"  />
          <span>Casual</span>
        </div>
        <div className='col-12 col-sm-6 col-lg-7 category-item'>
          <img className='img-fluid' src={gents} alt="gents" width="684px" />
          <span>Formal</span>
        </div>
      </div>

      {/* Second Row */}
      <div className="row mt-3">
        <div className='col-12 col-sm-6 col-lg-7 category-item'>
          <img className='img-fluid' src={girl} alt="girl" width="684px" />
          <span>Party</span>
        </div>
        <div className='col-12 col-sm-6 col-lg-5 category-item'>
          <img className='img-fluid' src={menImg} alt="dumbell" width="407px" />
          <span>Gym</span>
        </div>
      </div>
    </div>
  );
}

export default Category;
import React from 'react'
import vercace from '../../assets/images/Vector (2).svg'
import zara from '../../assets/images/zara-logo-1 1.svg'
import gucci from '../../assets/images/Vector (3).svg'
import prada from '../../assets/images/prada-logo-1 1.svg'
import calvinKlien from '../../assets/images/Vector (4).svg'
import './Brand.scss'

function Brand() {
  return (
    <>
    {/* brands name */}
<div className="brand row justify-content-center align-items-center text-center g-3">
  <div className="col-6 col-sm-4 col-md-2">
    <img src={vercace} alt="Versace" className="img-fluid" />
  </div>
  <div className="col-6 col-sm-4 col-md-2">
    <img src={zara} alt="Zara" className="img-fluid" />
  </div>
  <div className="col-6 col-sm-4 col-md-2">
    <img src={gucci} alt="Gucci" className="img-fluid" />
  </div>
  <div className="col-6 col-sm-4 col-md-2 ">
    <img src={prada} alt="Prada" className="img-fluid" />
  </div>
  <div className="col-6 col-sm-4 col-md-2">
    <img src={calvinKlien} alt="Calvin Klein" className="img-fluid" />
  </div>
</div>

{/* end */}
    </>
  )
}

export default Brand
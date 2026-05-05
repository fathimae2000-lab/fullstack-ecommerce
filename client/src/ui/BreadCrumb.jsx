import React from 'react'
import './BreadCrumb.scss'

function BreadCrumb({home,text}) {
  return (
    <>    
      {/* Breadcrumb */}
      <nav style={{ "--bs-breadcrumb-divider": "'>'" }} aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="#">{home}</a></li>
          <li className="breadcrumb-item">{text}</li>
          
        </ol>
      </nav>
    </>

  )
}

export default BreadCrumb
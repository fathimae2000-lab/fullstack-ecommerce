import React, { useState } from 'react'
import './NewArrival.scss'
import Button from '../../ui/Button'
import { useSelector } from 'react-redux'
import Card from '../../ui/Card'
function NewArrival() {


  const {productList} =useSelector((state)=>state.product)

  const [showAll,setShowAll]=useState(false)

  const visibleProducts=showAll ? productList : productList.slice(0,4)


  return (
    <>
      <div className=' arrival'>
        <h2>NEW ARRIVALS</h2>
        <div className='d-flex flex-wrap gap-3 align-items-center justify-content-center'>
            {visibleProducts.map(product =>(
              <Card  key={product.id} product={product}/>
            ))}
        </div>
          <Button onclick={()=>setShowAll(!showAll)}  text={showAll ? "Hide" : "ViewAll"}  />

            
        <hr />
      </div>
    </>
  )
}

export default NewArrival
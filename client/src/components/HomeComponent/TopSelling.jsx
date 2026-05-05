import React, { useState } from 'react'
import Card from '../../ui/Card'
import './TopSelling.scss'
import Button from '../../ui/Button'
import { useSelector } from 'react-redux'


function TopSelling() {

  const {productList}=useSelector(state => state.product)

  const[showAll,setShowAll]=useState(false)

  const visibleProducts=showAll ? productList : productList.slice(5,9)



  return (
    <>
      <div className='container selling'>
        <h2>TOP SELLING</h2>
        <div className='d-flex align-items-center justify-content-center gap-3 flex-wrap'>
          {visibleProducts.map(product =>(
            <Card  key={product.id} product={product}/>
          ))}
        </div>
          <Button onclick={()=>{
            setShowAll(!showAll)
          }}  text={showAll ? "Hide" : "View All"}/>
      </div>
    </>
  )
}

export default TopSelling